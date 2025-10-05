# Middleware Implementation Roadmap

## Project Overview

**Purpose**: Build a unified middleware layer between Next.js frontend and FastAPI backend to handle session management, request routing, streaming coordination, and business logic abstraction.

**Technology Stack**: TypeScript + Express.js (Node.js)
**Architecture**: Standalone microservice deployed alongside frontend and backend

---

## Implementation Phases

### Phase 1: Foundation & Core Infrastructure (Week 1)

#### 1.1 Project Setup
- [ ] Initialize TypeScript + Express.js project
- [ ] Configure TypeScript (`tsconfig.json`)
- [ ] Setup ESLint + Prettier
- [ ] Configure environment variables (`.env`)
- [ ] Setup Redis client connection
- [ ] Create base middleware architecture

**Deliverables**:
- `middleware/package.json`
- `middleware/tsconfig.json`
- `middleware/src/index.ts` (Express app entry)
- `middleware/src/config.ts` (Configuration management)
- `middleware/src/redis-client.ts` (Redis connection)

#### 1.2 Session Management Module
**Files**: `middleware/src/session/`

**Functions to Implement**:
1. `createSession(userId?: string): SessionData`
   - Generate unique thread ID
   - Create session metadata
   - Store in Redis with TTL
   - Return session object

2. `getSession(threadId: string): SessionData | null`
   - Retrieve session from Redis
   - Return null if expired/not found
   - Update last_activity timestamp

3. `resumeSession(threadId: string, userInput: string): Promise<void>`
   - Validate session exists
   - Call backend `/workflow/resume/{threadId}`
   - Update session metadata

4. `checkpointSession(threadId: string): Promise<void>`
   - Create checkpoint in Redis
   - Store current workflow state
   - Set checkpoint TTL

5. `cleanupSession(threadId: string): Promise<void>`
   - Delete all session-related keys
   - Call backend cleanup endpoints
   - Remove from Redis

**Session Data Structure**:
```typescript
interface SessionData {
  threadId: string;
  sessionId: string;
  userId?: string;
  createdAt: number;
  lastActivity: number;
  expiresAt: number;
  metadata: {
    // UI State Management
    currentUIPhase: 'requirements' | 'ideation' | 'selected' | 'error';
    clarificationLoopCount: number;
    selectedConceptId?: number;
    magicPencilEdits: Array<{
      conceptId: number;
      editType: string;
      timestamp: number;
    }>;
    progress: {
      overallCompletion: number;
      ingredientDiscovery: number;
      conceptGeneration: number;
      packaging: number;
    };

    // Workflow State
    backendPhase: string;
    currentNode: string;
    ingredientsCompleted: boolean;

    // Resume tracking
    resumeCount?: number;
    lastResume?: number;
  };
}
```

**Dependencies**:
- Redis client
- UUID generator
- TypeScript types for SessionData
- UI state types

**Testing**:
- Unit tests for each function
- Integration test for session lifecycle
- Redis mock for testing
- UI state metadata tests

---

### Phase 2: API Gateway & Request Routing (Week 1-2)

#### 2.1 API Gateway Module
**Files**: `middleware/src/gateway/`

**Functions to Implement**:
1. `routeRequest(req: Request): Promise<Response>`
   - Parse request path
   - Map to backend endpoint
   - Forward with headers
   - Return proxied response

2. `validateRequest(req: Request, schema: Schema): ValidationResult`
   - Load JSON schema
   - Validate request body
   - Return validation errors
   - Log validation failures

3. `transformRequest(req: Request, targetFormat: string): Request`
   - Convert camelCase to snake_case
   - Transform nested objects
   - Add metadata headers
   - Return transformed request

4. `transformResponse(res: Response, targetFormat: string): Response`
   - Convert snake_case to camelCase
   - Transform error formats
   - Add middleware metadata
   - Return transformed response

5. `rateLimit(userId: string, endpoint: string): boolean`
   - Check Redis rate limit counter
   - Increment counter with expiry
   - Return allow/deny
   - Log rate limit violations

6. `authenticate(token: string): AuthResult`
   - Check session token in Redis
   - Return user ID and permissions
   - Handle expired tokens

**Route Mapping**:
```typescript
const ROUTE_MAP = {
  '/api/chat': 'http://backend:8000/api/chat',
  '/api/chat/requirements': 'http://backend:8000/api/chat/requirements',
  '/api/chat/ideation-drafts': 'http://backend:8000/api/chat/ideation-drafts',
  '/api/chat/select-idea': 'http://backend:8000/api/chat/select-idea',
  '/api/chat/phase1': 'http://backend:8000/api/chat/phase1',
  '/api/chat/phase2': 'http://backend:8000/api/chat/phase2',
  '/api/workflow/*': 'http://backend:8000/workflow/*',
  '/api/magic-pencil/*': 'http://backend:8000/magic-pencil/*',
  '/api/trellis/*': 'http://backend:8000/trellis/*',
};
```

**Dependencies**:
- `axios` or `node-fetch` for HTTP requests
- JSON schema validator (AJV)
- JWT library (if using JWT)
- Express middleware for routing

**Testing**:
- Route mapping tests
- Request/response transformation tests
- Rate limiting tests with Redis mock
- Authentication tests

---

### Phase 3: Streaming Coordinator (Week 2)

#### 3.1 Streaming Module
**Files**: `middleware/src/streaming/`

**Functions to Implement**:
1. `createStreamConnection(threadId: string, res: Response): StreamConnection`
   - Establish SSE connection to backend
   - Setup event stream headers
   - Create connection handle
   - Track active connections

2. `aggregateStreams(streams: Stream[]): UnifiedStream`
   - Open multiple backend SSE connections
   - Merge events by timestamp
   - Handle event priority
   - Yield unified event stream

3. `handleBackpressure(stream: Stream, bufferSize: number): void`
   - Monitor buffer size
   - Pause upstream if buffer full
   - Resume when buffer drains
   - Log backpressure events

4. `parseSSE(chunk: string): StreamEvent`
   - Parse SSE format (`data: {...}`)
   - Extract event type and payload
   - Handle multi-line events
   - Return structured event

5. `forwardStreamEvent(event: StreamEvent, connections: Connection[]): void`
   - Format event as SSE
   - Write to all client connections
   - Handle write errors
   - Remove dead connections

**SSE Event Types**:
```typescript
type StreamEventType =
  // Workflow Events
  | 'state_update'
  | 'ingredients_update'
  | 'user_question'
  | 'concepts_generated'
  | 'magic_pencil_complete'
  | 'concept_selected'
  | 'project_package'
  | 'workflow_complete'
  | 'error'
  | 'timeout'
  // UI State Events
  | 'ui_phase_change'
  | 'ingredient_display_update'
  | 'clarification_prompt'
  | 'concept_variant_ready'
  | 'progress_update'
  | 'magic_pencil_active'
  | 'package_ready'
  | 'ui_error';
```

**Dependencies**:
- SSE parser library
- EventEmitter for event handling
- Stream utilities

**Testing**:
- SSE parsing tests
- Stream aggregation tests
- Backpressure simulation
- Connection management tests

---

### Phase 4: Workflow Orchestrator Interface (Week 2-3)

#### 4.1 Workflow Module
**Files**: `middleware/src/workflow/`

**Functions to Implement**:
1. `startWorkflow(userInput: string, sessionId?: string): Promise<WorkflowResponse>`
   - Create session if needed
   - POST to `/workflow/start`
   - Store workflow state in Redis
   - Return thread ID and status

2. `getWorkflowStatus(threadId: string): Promise<WorkflowStatus>`
   - Check Redis cache first
   - GET `/workflow/status/{threadId}`
   - Cache response
   - Return status object

3. `updateIngredient(threadId: string, index: number, field: string, value: string): Promise<void>`
   - Validate field name
   - POST to `/workflow/ingredients/{threadId}/update`
   - Invalidate cache
   - Emit update event

4. `addIngredient(threadId: string, ingredient: Ingredient): Promise<void>`
   - Validate ingredient data
   - POST to `/workflow/ingredients/{threadId}/add`
   - Invalidate cache
   - Emit update event

5. `selectConcept(threadId: string, conceptId: number, feedback?: string): Promise<void>`
   - Validate concept ID
   - POST to `/workflow/select-concept/{threadId}`
   - Update session state
   - Trigger packaging phase

6. `applyMagicPencilEdit(threadId: string, conceptId: number, editInstruction: string, editType: string): Promise<void>`
   - Validate edit parameters
   - POST to `/workflow/magic-pencil/{threadId}`
   - Track edit status
   - Return edit result

7. `getProjectPackage(threadId: string): Promise<ProjectPackage>`
   - Check cache
   - GET `/workflow/final-package/{threadId}`
   - Cache package
   - Return complete package

8. `exportProject(threadId: string, format: ExportFormat): Promise<ExportData>`
   - Validate format
   - GET `/workflow/exports/{threadId}`
   - Transform if needed
   - Return export data

9. `shareProject(threadId: string, platform: string): Promise<ShareResponse>`
   - Validate platform
   - POST to `/workflow/share/{threadId}`
   - Track sharing analytics
   - Return share URL

10. `getAnalytics(threadId: string): Promise<Analytics>`
    - Check cache
    - GET `/workflow/analytics/{threadId}`
    - Cache analytics
    - Return metrics

11. `getUIState(threadId: string): Promise<UIStateResponse>`
    - Fetch workflow state from Redis
    - Map backend phase to frontend UI phase
    - Calculate progress percentages
    - Return UI display data with ingredients/concepts

12. `updateProgressIndicators(threadId: string, phaseData: PhaseProgress): Promise<void>`
    - Calculate phase-specific completion percentage
    - Update session progress metadata
    - Emit progress_update SSE event
    - Cache updated progress

13. `syncFrontendState(threadId: string, uiPhase: UIPhase): Promise<void>`
    - Validate UI phase transition
    - Update session UI state
    - Emit ui_phase_change SSE event
    - Sync ingredient/concept display data

**Dependencies**:
- HTTP client
- Cache module
- Validation utilities
- UI state coordinator module

**Testing**:
- Workflow lifecycle tests
- State management tests
- Error handling tests
- Cache invalidation tests
- UI state synchronization tests
- Progress calculation tests

---

### Phase 5: Chat Interface Module (Week 3)

#### 5.1 Chat Module
**Files**: `middleware/src/chat/`

**Functions to Implement**:
1. `streamChat(messages: ChatMessage[], options?: ChatOptions): AsyncIterator<StreamEvent>`
   - Build request payload
   - POST to `/api/chat/` (SSE)
   - Parse SSE stream
   - Yield token chunks

2. `executeRequirementsLoop(text: string, projectContext?: ProjectContext): Promise<RequirementsResponse>`
   - Build request with context
   - POST to `/api/chat/requirements`
   - Parse response
   - Update project context

3. `generateIdeationDrafts(ingredients: Ingredient[], assumptions: string[], confidence: number): Promise<IdeationDraftsResponse>`
   - Validate ingredients
   - POST to `/api/chat/ideation-drafts`
   - Parse draft responses
   - Return drafts with images

4. `selectIdea(ideaId: string, ideaName: string, oneLiner: string, ingredients: Ingredient[], assumptions: string[]): Promise<SelectionResponse>`
   - Build selection request
   - POST to `/api/chat/select-idea`
   - Parse refined brief
   - Return selection response

5. `executeLegacyPhase1(text: string, existingIngredients?: Ingredient[]): Promise<Phase1Response>`
   - Build legacy request
   - POST to `/api/chat/phase1`
   - Validate response schema
   - Return phase 1 data

6. `executeLegacyPhase2(ideaId: string, ingredients: Ingredient[], tweaks?: any, previousBrief?: any, feedback?: any): Promise<Phase2Response>`
   - Build phase 2 request
   - POST to `/api/chat/phase2`
   - Validate imaging brief
   - Return brief data

**Dependencies**:
- SSE client
- Schema validators
- Type definitions from frontend

**Testing**:
- Chat streaming tests
- Phase endpoint tests
- Schema validation tests
- Error handling tests

---

### Phase 5.5: UI State Management Module (Week 3-4)

#### 5.5.1 UI State Coordinator
**Files**: `middleware/src/ui-state/`

**Purpose**: Synchronize backend workflow phases with frontend UI states, providing real-time updates and progress tracking.

**Functions to Implement**:

1. `getUIState(threadId: string): Promise<UIStateResponse>`
   - Fetch current workflow phase from Redis
   - Map backend NodeState to frontend UI phase
   - Return UI display data (ingredients, questions, concepts)
   - Include progress completion percentage

2. `updateUIPhase(threadId: string, uiPhase: UIPhase): Promise<void>`
   - Validate phase transition
   - Update session UI state metadata
   - Emit `ui_phase_change` SSE event
   - Cache updated state in Redis

3. `syncIngredientDisplay(threadId: string): Promise<IngredientDisplayState>`
   - Fetch ingredients from Redis
   - Map to frontend display format
   - Include null field indicators
   - Add confidence level badges
   - Return categorized ingredient list

4. `handleClarificationPrompt(threadId: string, question: string): Promise<void>`
   - Store clarification question in session
   - Emit `clarification_prompt` SSE event
   - Increment clarification counter
   - Update UI to show question input

5. `updateProgressIndicators(threadId: string, phaseData: PhaseProgress): Promise<void>`
   - Calculate completion percentage per phase
   - Track ingredients discovered (P1a-P1c progress)
   - Track concepts generated (O1-PR1 progress)
   - Emit `progress_update` SSE event
   - Update session progress metadata

6. `emitConceptVariants(threadId: string, variants: ConceptVariant[]): Promise<void>`
   - Validate 3 concept variants
   - Emit `concept_variant_ready` SSE events
   - Update session with variant data
   - Cache concepts for Magic Pencil edits

**UI Phase Mapping**:
```typescript
const PHASE_MAPPING = {
  // Backend Phase -> Frontend UI Phase
  INGREDIENT_DISCOVERY: 'requirements',  // P1a, P1b, P1c
  GOAL_FORMATION: 'ideation',            // G1
  CONCEPT_GENERATION: 'ideation',        // O1, E1, PR1, NB
  OUTPUT_ASSEMBLY: 'selected',           // H1
  COMPLETED: 'selected',
  ERROR: 'error'
};

const NODE_TO_UI_PHASE = {
  P1a: 'requirements',
  P1b: 'requirements',
  P1c: 'requirements',
  G1: 'ideation',
  O1: 'ideation',
  E1: 'ideation',
  PR1: 'ideation',
  NB: 'ideation',
  MP: 'ideation',  // Magic Pencil during ideation
  H1: 'selected'
};
```

**UI State Types**:
```typescript
enum UIPhase {
  REQUIREMENTS = 'requirements',
  IDEATION = 'ideation',
  SELECTED = 'selected',
  ERROR = 'error'
}

interface UIStateResponse {
  threadId: string;
  uiPhase: UIPhase;
  backendPhase: WorkflowPhase;
  currentNode: NodeState;
  displayData: {
    ingredients?: IngredientDisplayState;
    clarificationQuestion?: string;
    conceptVariants?: ConceptVariant[];
    projectPackage?: ProjectPackage;
  };
  progress: {
    overallCompletion: number;  // 0-100
    ingredientDiscovery: number;  // 0-100
    conceptGeneration: number;  // 0-100
    packaging: number;  // 0-100
  };
  needsUserInput: boolean;
  clarificationLoopCount: number;
}

interface IngredientDisplayState {
  ingredients: Array<{
    name: string | null;
    size: string | null;
    material: string | null;
    category: string | null;
    confidence: number;
    confidenceLevel: 'high' | 'medium' | 'low';
    hasNulls: boolean;
    nullFields: string[];
    source: 'user_input' | 'ml_extraction' | 'user_clarification' | 'derived';
  }>;
  categories: {
    containers: string[];
    fasteners: string[];
    decorative: string[];
    tools: string[];
  };
  completed: boolean;
  clarificationNeeded: boolean;
}

interface PhaseProgress {
  phaseName: string;
  nodeState: NodeState;
  completionPercentage: number;
  itemsProcessed: number;
  totalItems: number;
}
```

**UI Event Types** (SSE):
```typescript
type UIEventType =
  | 'ui_phase_change'           // Frontend should transition UI phase
  | 'ingredient_display_update'  // Update ingredient list UI
  | 'clarification_prompt'       // Show clarification question input
  | 'concept_variant_ready'      // Display concept card
  | 'progress_update'            // Update progress indicators
  | 'magic_pencil_active'        // Enable Magic Pencil editing UI
  | 'package_ready'              // Show final project package
  | 'ui_error';                  // Display error state with message

interface UIStreamEvent {
  type: UIEventType;
  threadId: string;
  timestamp: number;
  data: {
    uiPhase?: UIPhase;
    ingredient?: any;
    question?: string;
    variant?: ConceptVariant;
    progress?: PhaseProgress;
    error?: {
      code: string;
      message: string;
      userMessage: string;
    };
  };
}
```

**Progress Calculation Logic**:
```typescript
function calculateProgress(state: WorkflowState): ProgressMetrics {
  const phaseWeights = {
    INGREDIENT_DISCOVERY: 0.30,  // 30% of overall progress
    GOAL_FORMATION: 0.10,         // 10%
    CONCEPT_GENERATION: 0.40,     // 40%
    OUTPUT_ASSEMBLY: 0.20         // 20%
  };

  // Ingredient Discovery sub-progress
  const ingredientProgress = {
    P1a_complete: state.ingredients.length > 0,
    P1b_complete: !state.needsClarification,
    P1c_complete: state.ingredientsCompleted
  };
  const ingredientPct = Object.values(ingredientProgress).filter(Boolean).length / 3 * 100;

  // Concept Generation sub-progress
  const conceptProgress = {
    G1_complete: state.goalsFormed,
    O1_complete: state.choicesProposed,
    E1_complete: state.choicesEvaluated,
    PR1_complete: state.promptsBuilt,
    NB_complete: state.imagesGenerated
  };
  const conceptPct = Object.values(conceptProgress).filter(Boolean).length / 5 * 100;

  return {
    overallCompletion: calculateWeightedProgress(state, phaseWeights),
    ingredientDiscovery: ingredientPct,
    conceptGeneration: conceptPct,
    packaging: state.currentPhase === 'OUTPUT_ASSEMBLY' ? 50 : (state.currentPhase === 'COMPLETED' ? 100 : 0)
  };
}
```

**Session Metadata Extensions**:
```typescript
interface SessionData {
  threadId: string;
  sessionId: string;
  userId?: string;
  createdAt: number;
  lastActivity: number;
  expiresAt: number;
  metadata: {
    // Existing metadata...

    // NEW: UI State fields
    currentUIPhase: UIPhase;
    ingredientDisplayState: IngredientDisplayState;
    clarificationLoopCount: number;
    selectedConceptId?: number;
    magicPencilEdits: Array<{
      conceptId: number;
      editType: string;
      timestamp: number;
    }>;
    progress: {
      overallCompletion: number;
      phaseCompletions: Record<string, number>;
    };
  };
}
```

**Dependencies**:
- Redis client for state storage
- SSE streaming module
- Workflow state types from backend
- Frontend UI type definitions

**Testing**:
- UI phase mapping tests
- Progress calculation tests
- SSE event emission tests
- State synchronization tests
- Clarification loop handling tests

---

### Phase 6: Image Processing Module (Week 3-4)

#### 6.1 Image Module
**Files**: `middleware/src/image/`

**Functions to Implement**:
1. `generate3DAsset(images: string[], config: Trellis3DConfig): Promise<TrellisOutput>`
   - Validate image URLs
   - Build Trellis request
   - POST to `/trellis/generate`
   - Poll for completion
   - Return 3D assets

2. `applyMagicPencil(originalUrl: string, drawnOverlayUrl: string, prompt: string): Promise<MagicPencilResponse>`
   - Validate image URLs
   - POST to `/magic-pencil/edit`
   - Wait for processing
   - Return edited image

3. `uploadImage(file: File): Promise<string>`
   - Validate file type/size
   - Upload to storage (S3/Cloud Storage)
   - Generate public URL
   - Return URL

4. `optimizeImage(imageUrl: string, targetSize: number): Promise<string>`
   - Download image
   - Resize/compress
   - Upload optimized version
   - Return new URL

**Dependencies**:
- Image processing library (Sharp)
- Cloud storage SDK
- HTTP client

**Testing**:
- Image upload tests
- Optimization tests
- API integration tests
- Error handling tests

---

### Phase 7: Error Handling & Resilience (Week 4)

#### 7.1 Error Handling Module
**Files**: `middleware/src/error-handling/`

**Functions to Implement**:
1. `handleError(error: Error, context: ErrorContext): ErrorResponse`
   - Classify error type
   - Extract relevant details
   - Format standard response
   - Log error with context

2. `retryWithBackoff(fn: Function, maxRetries: number, baseDelay: number): Promise<any>`
   - Execute function
   - Catch retryable errors
   - Wait with exponential backoff
   - Retry up to max attempts

3. `circuitBreaker(endpoint: string, threshold: number): CircuitBreaker`
   - Track failure rate
   - Open circuit after threshold
   - Allow test requests
   - Close circuit on success

4. `gracefulDegrade(primaryFn: Function, fallbackFn: Function): Promise<any>`
   - Try primary function
   - Catch errors
   - Execute fallback
   - Log degradation

5. `logError(error: Error, severity: 'warn' | 'error' | 'critical'): void`
   - Format error details
   - Add context metadata
   - Log to appropriate channel
   - Increment error metrics

**Error Types**:
```typescript
class NetworkError extends Error {}
class ValidationError extends Error {}
class AuthenticationError extends Error {}
class RateLimitError extends Error {}
class BackendError extends Error {}
class TimeoutError extends Error {}
```

**Dependencies**:
- Winston or Pino for logging
- Circuit breaker library
- Retry utilities

**Testing**:
- Error classification tests
- Retry logic tests
- Circuit breaker tests
- Fallback tests

---

### Phase 8: Caching Layer (Week 4)

#### 8.1 Cache Module
**Files**: `middleware/src/cache/`

**Functions to Implement**:
1. `getCached<T>(key: string): Promise<T | null>`
   - Build full cache key
   - GET from Redis
   - Deserialize value
   - Return data or null

2. `setCached<T>(key: string, value: T, ttl: number): Promise<void>`
   - Serialize value
   - SETEX in Redis
   - Handle errors
   - Log cache set

3. `invalidateCache(pattern: string): Promise<number>`
   - Find keys matching pattern
   - Delete all matches
   - Return count deleted
   - Log invalidation

4. `getCachedOrFetch<T>(key: string, fetchFn: () => Promise<T>, ttl: number): Promise<T>`
   - Try cache first
   - If miss, call fetchFn
   - Cache result
   - Return data

**Cache Keys**:
```typescript
const CACHE_KEYS = {
  session: (threadId: string) => `cache:session:${threadId}`,
  workflowStatus: (threadId: string) => `cache:workflow_status:${threadId}`,
  projectPackage: (threadId: string) => `cache:package:${threadId}`,
  analytics: (threadId: string) => `cache:analytics:${threadId}`,
  ingredients: (threadId: string) => `cache:ingredients:${threadId}`,
};
```

**Dependencies**:
- Redis client
- Serialization utilities

**Testing**:
- Cache hit/miss tests
- TTL expiration tests
- Invalidation tests
- Concurrent access tests

---

### Phase 9: Analytics & Monitoring (Week 5)

#### 9.1 Analytics Module
**Files**: `middleware/src/analytics/`

**Functions to Implement**:
1. `trackEvent(event: AnalyticsEvent): void`
   - Validate event structure
   - Add timestamp and metadata
   - Store in Redis or analytics DB
   - Log event

2. `getMetrics(threadId: string): Promise<Metrics>`
   - Fetch from backend
   - Cache metrics
   - Transform format
   - Return metrics object

3. `recordLatency(endpoint: string, duration: number): void`
   - Add to time-series data
   - Update rolling averages
   - Check SLA thresholds
   - Alert if needed

**Event Types**:
```typescript
interface AnalyticsEvent {
  type: 'workflow_start' | 'workflow_complete' | 'error' | 'share' | 'export';
  threadId: string;
  userId?: string;
  timestamp: number;
  metadata: Record<string, any>;
}
```

**Dependencies**:
- Redis for time-series data
- Logging framework

**Testing**:
- Event tracking tests
- Metrics calculation tests
- Performance tests

---

### Phase 10: Integration & Testing (Week 5-6)

#### 10.1 Integration Tasks
- [ ] Connect middleware to frontend
- [ ] Connect middleware to backend
- [ ] Configure CORS policies
- [ ] Setup environment variables
- [ ] Configure Redis connection pooling
- [ ] Implement health check endpoints
- [ ] Add request/response logging
- [ ] Setup error monitoring (Sentry/DataDog)

#### 10.2 Testing Suite
**Unit Tests**:
- All module functions
- Error handling
- Cache logic
- Validation

**Integration Tests**:
- End-to-end workflow tests
- SSE streaming tests
- Multi-client tests
- Failure scenario tests

**Load Tests**:
- Concurrent request handling
- Stream multiplexing under load
- Redis connection pooling
- Memory leak detection

**Testing Tools**:
- Jest for unit tests
- Supertest for API tests
- Artillery for load tests
- Redis mock for unit tests

---

### Phase 11: Deployment & DevOps (Week 6)

#### 11.1 Containerization
**Files**: `middleware/Dockerfile`
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3001
CMD ["node", "dist/index.js"]
```

#### 11.2 Docker Compose Integration
Update `docker-compose.yml`:
```yaml
services:
  middleware:
    build: ./middleware
    ports:
      - "3001:3001"
    environment:
      - BACKEND_URL=http://backend:8000
      - REDIS_URL=redis://redis:6379
      - NODE_ENV=production
    depends_on:
      - backend
      - redis
```

#### 11.3 Deployment Checklist
- [ ] Build TypeScript to production
- [ ] Configure environment variables
- [ ] Setup health checks
- [ ] Configure logging
- [ ] Setup monitoring/alerting
- [ ] Configure auto-scaling
- [ ] Setup CI/CD pipeline
- [ ] Deploy to staging
- [ ] Run integration tests
- [ ] Deploy to production

---

## API Endpoints Exposed by Middleware

### Session Endpoints
- `POST /session/create` - Create new session
- `GET /session/:threadId` - Get session data
- `POST /session/:threadId/resume` - Resume session
- `DELETE /session/:threadId` - Cleanup session

### Workflow Endpoints (Proxied + Enhanced)
- `POST /workflow/start` - Start workflow
- `GET /workflow/stream/:threadId` - SSE stream (aggregated)
- `POST /workflow/resume/:threadId` - Resume workflow
- `GET /workflow/status/:threadId` - Get status (cached)
- `GET /workflow/ingredients/:threadId` - Get ingredients (cached)
- `POST /workflow/ingredients/:threadId/update` - Update ingredient
- `POST /workflow/ingredients/:threadId/add` - Add ingredient
- `POST /workflow/select-concept/:threadId` - Select concept
- `POST /workflow/magic-pencil/:threadId` - Apply edit
- `GET /workflow/package/:threadId` - Get package (cached)
- `GET /workflow/export/:threadId` - Export project
- `POST /workflow/share/:threadId` - Share project
- `GET /workflow/analytics/:threadId` - Get analytics (cached)

### UI State Endpoints
- `GET /ui-state/:threadId` - Get current UI state with progress
- `GET /ui-state/:threadId/phase` - Get current UI phase mapping
- `GET /ui-state/:threadId/progress` - Get progress indicators
- `GET /ui-state/:threadId/ingredients` - Get ingredient display state
- `POST /ui-state/:threadId/clarification` - Submit clarification answer
- `GET /ui-state/:threadId/concepts` - Get concept variants for display

### Chat Endpoints (Proxied)
- `POST /chat/stream` - Stream chat (SSE)
- `POST /chat/requirements` - Requirements loop
- `POST /chat/ideation-drafts` - Generate drafts
- `POST /chat/select-idea` - Select idea
- `POST /chat/phase1` - Legacy Phase 1
- `POST /chat/phase2` - Legacy Phase 2

### Image Endpoints (Proxied)
- `POST /image/upload` - Upload image
- `POST /image/optimize` - Optimize image
- `POST /magic-pencil/edit` - Apply Magic Pencil
- `POST /trellis/generate` - Generate 3D

### Health & Monitoring
- `GET /health` - Health check
- `GET /metrics` - Prometheus metrics
- `GET /ready` - Readiness check

---

## File Structure

```
middleware/
├── package.json
├── tsconfig.json
├── .env.example
├── Dockerfile
├── src/
│   ├── index.ts                 # Express app entry
│   ├── config.ts                # Configuration
│   ├── redis-client.ts          # Redis connection
│   ├── types/                   # TypeScript types
│   │   ├── session.ts
│   │   ├── workflow.ts
│   │   ├── chat.ts
│   │   ├── events.ts
│   │   └── ui-state.ts         # UI state types
│   ├── session/                 # Session management
│   │   ├── index.ts
│   │   ├── session-manager.ts
│   │   └── session.routes.ts
│   ├── ui-state/                # UI state coordinator
│   │   ├── index.ts
│   │   ├── ui-state-manager.ts
│   │   ├── progress-calculator.ts
│   │   └── ui-state.routes.ts
│   ├── gateway/                 # API Gateway
│   │   ├── index.ts
│   │   ├── router.ts
│   │   ├── validator.ts
│   │   ├── transformer.ts
│   │   ├── rate-limiter.ts
│   │   └── auth.ts
│   ├── streaming/               # Streaming coordinator
│   │   ├── index.ts
│   │   ├── sse-parser.ts
│   │   ├── stream-aggregator.ts
│   │   └── connection-manager.ts
│   ├── workflow/                # Workflow orchestrator
│   │   ├── index.ts
│   │   ├── workflow-manager.ts
│   │   └── workflow.routes.ts
│   ├── chat/                    # Chat interface
│   │   ├── index.ts
│   │   ├── chat-handler.ts
│   │   └── chat.routes.ts
│   ├── image/                   # Image processing
│   │   ├── index.ts
│   │   ├── image-handler.ts
│   │   └── image.routes.ts
│   ├── error-handling/          # Error handling
│   │   ├── index.ts
│   │   ├── error-handler.ts
│   │   ├── circuit-breaker.ts
│   │   └── retry.ts
│   ├── cache/                   # Caching
│   │   ├── index.ts
│   │   └── cache-manager.ts
│   ├── analytics/               # Analytics
│   │   ├── index.ts
│   │   ├── event-tracker.ts
│   │   └── metrics.ts
│   └── utils/                   # Utilities
│       ├── logger.ts
│       ├── validation.ts
│       └── helpers.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   └── load/
└── dist/                        # Compiled JavaScript
```

---

## Dependencies

### Production Dependencies
```json
{
  "express": "^4.18.2",
  "redis": "^4.6.0",
  "axios": "^1.6.0",
  "ajv": "^8.12.0",
  "ajv-formats": "^2.1.1",
  "winston": "^3.11.0",
  "dotenv": "^16.3.1",
  "cors": "^2.8.5",
  "helmet": "^7.1.0",
  "express-rate-limit": "^7.1.5",
  "jsonwebtoken": "^9.0.2",
  "uuid": "^9.0.1"
}
```

### Development Dependencies
```json
{
  "typescript": "^5.3.0",
  "@types/node": "^20.10.0",
  "@types/express": "^4.17.21",
  "@types/cors": "^2.8.17",
  "jest": "^29.7.0",
  "@types/jest": "^29.5.0",
  "ts-jest": "^29.1.0",
  "supertest": "^6.3.0",
  "nodemon": "^3.0.0",
  "ts-node": "^10.9.0",
  "eslint": "^8.55.0",
  "prettier": "^3.1.0"
}
```

---

## Success Metrics

### Performance Targets
- **Latency**: < 50ms overhead per request
- **Throughput**: > 1000 requests/second
- **SSE Streams**: Support 100+ concurrent streams
- **Cache Hit Rate**: > 80% for frequently accessed data
- **Error Rate**: < 0.1% under normal load

### Monitoring Dashboards
- Request latency percentiles (p50, p95, p99)
- Error rates by endpoint
- Cache hit/miss ratios
- Active SSE connections
- Redis connection pool metrics
- Memory and CPU usage

---

## Timeline Summary

| Week | Phase | Deliverables |
|------|-------|-------------|
| 1 | Foundation + Session + Gateway | Core infrastructure, session management, API routing |
| 2 | Streaming + Workflow | SSE handling, workflow orchestration |
| 3 | Chat + UI State | Chat interface, UI state management, phase mapping |
| 4 | Image + Error Handling + Caching | Image processing, resilience, performance optimization |
| 5 | Analytics + Integration | Monitoring, end-to-end testing, UI state synchronization |
| 6 | Deployment | Production deployment, monitoring setup |

**Total Duration**: 6 weeks
**Team Size**: 2-3 developers
**Effort**: ~300-400 developer hours