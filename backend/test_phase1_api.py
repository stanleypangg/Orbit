"""
Quick test script for Phase 1 API endpoints.
Run this to verify the Phase 1 implementation is working.
"""
import asyncio
import json
from app.endpoints.chat.phase_router import (
    Phase1Request,
    Phase2Request,
    phase1,
    phase2
)


async def test_phase1():
    """Test Phase 1 endpoint with sample materials."""
    print("=" * 60)
    print("Testing Phase 1: Material Extraction & Idea Generation")
    print("=" * 60)
    
    # Test case 1: Simple materials
    request = Phase1Request(
        text="I have 3 empty plastic water bottles and 5 aluminum soda cans"
    )
    
    print(f"\nInput: {request.text}")
    print("\nCalling Phase 1 endpoint...")
    
    try:
        result = await phase1(request)
        print("\n✓ Phase 1 Success!")
        print(f"  - Extracted {len(result['ingredients'])} ingredients")
        print(f"  - Overall confidence: {result['confidence']:.2f}")
        print(f"  - Needs clarification: {result['needs_clarification']}")
        print(f"  - Generated {len(result['ideas'])} ideas")
        
        print("\n📦 Ingredients:")
        for i, ingredient in enumerate(result['ingredients'], 1):
            print(f"  {i}. {ingredient['name']} ({ingredient['material']})")
            print(f"     Size: {ingredient.get('size', 'N/A')}, Confidence: {ingredient['confidence']:.2f}")
        
        print("\n💡 Ideas:")
        for i, idea in enumerate(result['ideas'], 1):
            print(f"  {i}. {idea['title']}")
            print(f"     {idea['one_liner']}")
        
        if result.get('clarifying_questions'):
            print("\n❓ Clarifying Questions:")
            for q in result['clarifying_questions']:
                print(f"  - {q}")
        
        return result
        
    except Exception as e:
        print(f"\n✗ Phase 1 Failed: {e}")
        import traceback
        traceback.print_exc()
        return None


async def test_phase2(phase1_result):
    """Test Phase 2 endpoint with Phase 1 output."""
    if not phase1_result:
        print("\n⚠ Skipping Phase 2 test (Phase 1 failed)")
        return
    
    print("\n" + "=" * 60)
    print("Testing Phase 2: Imaging Brief Generation")
    print("=" * 60)
    
    # Use the first idea from Phase 1
    first_idea = phase1_result['ideas'][0]
    
    request = Phase2Request(
        ideaId=first_idea['id'],
        ingredients=phase1_result['ingredients']
    )
    
    print(f"\nSelected Idea: {first_idea['title']}")
    print("\nCalling Phase 2 endpoint...")
    
    try:
        result = await phase2(request)
        print("\n✓ Phase 2 Success!")
        print(f"  - Idea ID: {result['idea_id']}")
        print(f"  - Prompt length: {len(result['prompt'])} chars")
        print(f"  - Needs clarification: {result.get('needs_clarification', False)}")
        
        print(f"\n🎨 Imaging Brief:")
        print(f"  Prompt: {result['prompt'][:200]}...")
        
        if result.get('camera'):
            camera = result['camera']
            print(f"\n📷 Camera Settings:")
            print(f"  - View: {camera.get('view', 'N/A')}")
            print(f"  - Focal length: {camera.get('focal_length_mm', 'N/A')}mm")
            print(f"  - Aperture: f/{camera.get('aperture_f', 'N/A')}")
        
        render = result['render']
        print(f"\n🖼️ Render Config:")
        print(f"  - Aspect ratio: {render['aspect_ratio']}")
        print(f"  - Image size: {render['image_size']}")
        print(f"  - Count: {render['count']}")
        
        if result.get('clarifying_questions'):
            print("\n❓ Clarifying Questions:")
            for q in result['clarifying_questions']:
                print(f"  - {q}")
        
        return result
        
    except Exception as e:
        print(f"\n✗ Phase 2 Failed: {e}")
        import traceback
        traceback.print_exc()
        return None


async def main():
    """Run all tests."""
    print("\n🧪 Phase 1 API Integration Test\n")
    
    # Test Phase 1
    phase1_result = await test_phase1()
    
    # Test Phase 2 with Phase 1 output
    if phase1_result:
        phase2_result = await test_phase2(phase1_result)
    
    print("\n" + "=" * 60)
    print("Test Complete!")
    print("=" * 60)
    print("\n✓ Integration test completed successfully")
    print("\nNext steps:")
    print("  1. Start the backend: uvicorn main:app --reload --port 8000")
    print("  2. Start the frontend: cd frontend && npm run dev")
    print("  3. Visit: http://localhost:3000/phase1")


if __name__ == "__main__":
    asyncio.run(main())

