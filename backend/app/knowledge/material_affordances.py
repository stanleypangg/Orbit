"""
Material Affordance Knowledge System for the AI Recycle-to-Market Generator.
Provides structured knowledge about material properties, use cases, and safety considerations.
"""
import json
from typing import Dict, List, Optional, Any
from dataclasses import dataclass
from enum import Enum


class MaterialType(Enum):
    """Standard material classifications."""
    ALUMINUM = "aluminum"
    PLASTIC = "plastic"
    GLASS = "glass"
    CARDBOARD = "cardboard"
    PAPER = "paper"
    WOOD = "wood"
    FABRIC = "fabric"
    METAL = "metal"
    CERAMIC = "ceramic"
    RUBBER = "rubber"
    COMPOSITE = "composite"


class ToolComplexity(Enum):
    """Tool complexity levels."""
    BASIC = "basic"          # Hand tools, scissors, glue
    INTERMEDIATE = "intermediate"  # Drill, saw, heat gun
    ADVANCED = "advanced"    # Specialized tools, machinery


class SafetyLevel(Enum):
    """Safety assessment levels."""
    SAFE = "safe"            # No special precautions
    CAUTION = "caution"      # Basic safety measures
    WARNING = "warning"      # Significant safety concerns
    DANGEROUS = "dangerous"  # Not recommended for DIY


@dataclass
class MaterialAffordance:
    """
    Represents what a material 'affords' - its properties and potential uses.
    """
    material_type: MaterialType
    structural_strength: float  # 0.0 to 1.0
    flexibility: float          # 0.0 to 1.0
    weather_resistance: float   # 0.0 to 1.0
    aesthetic_appeal: float     # 0.0 to 1.0
    workability: float         # 0.0 to 1.0 (ease of cutting, shaping)

    # Use case categories
    structural_uses: List[str]
    decorative_uses: List[str]
    functional_uses: List[str]

    # Compatibility and safety
    compatible_materials: List[MaterialType]
    incompatible_materials: List[MaterialType]
    safety_level: SafetyLevel
    safety_notes: List[str]

    # Tool requirements
    required_tools: List[str]
    tool_complexity: ToolComplexity

    # Processing notes
    joining_methods: List[str]  # How to connect to other materials
    finishing_options: List[str]  # Surface treatments
    special_considerations: List[str]


class MaterialAffordanceKnowledgeBase:
    """
    Comprehensive knowledge base of material properties and affordances.
    """

    def __init__(self):
        self.affordances = self._initialize_affordances()
        self.safety_rules = self._initialize_safety_rules()
        self.project_patterns = self._initialize_project_patterns()

    def _initialize_affordances(self) -> Dict[MaterialType, MaterialAffordance]:
        """Initialize the material affordance database."""
        return {
            MaterialType.ALUMINUM: MaterialAffordance(
                material_type=MaterialType.ALUMINUM,
                structural_strength=0.8,
                flexibility=0.6,
                weather_resistance=0.9,
                aesthetic_appeal=0.7,
                workability=0.7,
                structural_uses=[
                    "framework", "brackets", "supports", "frames", "housing"
                ],
                decorative_uses=[
                    "trim", "accents", "reflective surfaces", "modern finishes"
                ],
                functional_uses=[
                    "containers", "heat shields", "electrical components", "tools"
                ],
                compatible_materials=[
                    MaterialType.PLASTIC, MaterialType.WOOD, MaterialType.RUBBER
                ],
                incompatible_materials=[
                    MaterialType.METAL  # Galvanic corrosion risk
                ],
                safety_level=SafetyLevel.CAUTION,
                safety_notes=[
                    "Sharp edges when cut", "Wear gloves when handling",
                    "File smooth all cut edges"
                ],
                required_tools=[
                    "tin snips", "file", "drill", "safety gloves"
                ],
                tool_complexity=ToolComplexity.BASIC,
                joining_methods=[
                    "screws", "rivets", "adhesive", "mechanical fasteners"
                ],
                finishing_options=[
                    "polishing", "anodizing", "painting", "clear coating"
                ],
                special_considerations=[
                    "Conduct electricity", "Lightweight but strong",
                    "Easily recycled", "Can be cold-formed"
                ]
            ),

            MaterialType.PLASTIC: MaterialAffordance(
                material_type=MaterialType.PLASTIC,
                structural_strength=0.5,
                flexibility=0.8,
                weather_resistance=0.7,
                aesthetic_appeal=0.6,
                workability=0.9,
                structural_uses=[
                    "housings", "containers", "panels", "non-load bearing parts"
                ],
                decorative_uses=[
                    "colored components", "transparent elements", "texture", "curves"
                ],
                functional_uses=[
                    "storage", "water resistance", "insulation", "flexibility"
                ],
                compatible_materials=[
                    MaterialType.ALUMINUM, MaterialType.WOOD, MaterialType.FABRIC,
                    MaterialType.RUBBER
                ],
                incompatible_materials=[],
                safety_level=SafetyLevel.SAFE,
                safety_notes=[
                    "Check plastic type before heating", "Ventilate when heating",
                    "Some plastics release fumes when heated"
                ],
                required_tools=[
                    "craft knife", "scissors", "drill", "heat gun (optional)"
                ],
                tool_complexity=ToolComplexity.BASIC,
                joining_methods=[
                    "screws", "adhesive", "heat welding", "mechanical clips"
                ],
                finishing_options=[
                    "sanding", "painting", "polishing", "heat forming"
                ],
                special_considerations=[
                    "Lightweight", "Chemical resistant", "Easy to clean",
                    "Can be heat-formed", "UV degradation over time"
                ]
            ),

            MaterialType.GLASS: MaterialAffordance(
                material_type=MaterialType.GLASS,
                structural_strength=0.3,  # Brittle
                flexibility=0.1,
                weather_resistance=1.0,
                aesthetic_appeal=0.9,
                workability=0.2,  # Difficult to work with
                structural_uses=[
                    "panels", "windows", "protective barriers"
                ],
                decorative_uses=[
                    "transparent elements", "light diffusion", "artistic features",
                    "mosaic pieces", "vases", "displays"
                ],
                functional_uses=[
                    "containers", "lighting", "optics", "displays"
                ],
                compatible_materials=[
                    MaterialType.WOOD, MaterialType.METAL, MaterialType.RUBBER
                ],
                incompatible_materials=[],
                safety_level=SafetyLevel.WARNING,
                safety_notes=[
                    "Extremely sharp when broken", "Wear safety glasses",
                    "Use proper glass cutting tools", "Handle with great care",
                    "Never attempt to drill without proper bits"
                ],
                required_tools=[
                    "glass cutter", "safety glasses", "thick gloves", "pliers"
                ],
                tool_complexity=ToolComplexity.INTERMEDIATE,
                joining_methods=[
                    "silicone adhesive", "glazing compound", "mechanical frames"
                ],
                finishing_options=[
                    "polishing", "etching", "painting", "frosting"
                ],
                special_considerations=[
                    "Brittle - prone to breaking", "Excellent visibility",
                    "Chemical resistant", "Thermal shock sensitive",
                    "Difficult to modify safely"
                ]
            ),

            MaterialType.CARDBOARD: MaterialAffordance(
                material_type=MaterialType.CARDBOARD,
                structural_strength=0.3,
                flexibility=0.7,
                weather_resistance=0.1,  # Poor water resistance
                aesthetic_appeal=0.5,
                workability=1.0,  # Very easy to work with
                structural_uses=[
                    "temporary supports", "templates", "lightweight panels"
                ],
                decorative_uses=[
                    "covers", "backing", "templates", "prototyping", "art projects"
                ],
                functional_uses=[
                    "organization", "packaging", "insulation", "templates"
                ],
                compatible_materials=[
                    MaterialType.PAPER, MaterialType.FABRIC, MaterialType.PLASTIC
                ],
                incompatible_materials=[],
                safety_level=SafetyLevel.SAFE,
                safety_notes=[
                    "Dust when cutting", "Paper cuts possible"
                ],
                required_tools=[
                    "craft knife", "ruler", "cutting mat", "adhesive"
                ],
                tool_complexity=ToolComplexity.BASIC,
                joining_methods=[
                    "glue", "tape", "staples", "folding tabs"
                ],
                finishing_options=[
                    "painting", "covering", "laminating", "decorating"
                ],
                special_considerations=[
                    "Not weather resistant", "Biodegradable", "Lightweight",
                    "Great for prototyping", "Easily decorated"
                ]
            ),

            MaterialType.WOOD: MaterialAffordance(
                material_type=MaterialType.WOOD,
                structural_strength=0.8,
                flexibility=0.4,
                weather_resistance=0.6,
                aesthetic_appeal=0.9,
                workability=0.8,
                structural_uses=[
                    "framework", "supports", "platforms", "structures"
                ],
                decorative_uses=[
                    "natural finish", "staining", "carving", "panels"
                ],
                functional_uses=[
                    "furniture", "storage", "handles", "tools"
                ],
                compatible_materials=[
                    MaterialType.METAL, MaterialType.PLASTIC, MaterialType.FABRIC,
                    MaterialType.GLASS
                ],
                incompatible_materials=[],
                safety_level=SafetyLevel.CAUTION,
                safety_notes=[
                    "Splinters possible", "Wear safety glasses when cutting",
                    "Dust protection recommended", "Check for nails/staples"
                ],
                required_tools=[
                    "saw", "sandpaper", "drill", "safety glasses"
                ],
                tool_complexity=ToolComplexity.INTERMEDIATE,
                joining_methods=[
                    "screws", "nails", "wood glue", "dowels", "joints"
                ],
                finishing_options=[
                    "sanding", "staining", "painting", "oiling", "varnishing"
                ],
                special_considerations=[
                    "Natural material", "Can warp with moisture",
                    "Grain direction affects strength", "Renewable resource"
                ]
            )
        }

    def _initialize_safety_rules(self) -> List[Dict[str, Any]]:
        """Initialize safety rules and material interaction warnings."""
        return [
            {
                "rule_id": "no_glass_drilling",
                "materials": [MaterialType.GLASS],
                "operations": ["drilling", "cutting"],
                "severity": "warning",
                "message": "Glass drilling requires special diamond bits and extreme care. Not recommended for beginners.",
                "alternatives": ["Use existing holes", "Frame instead of drilling", "Professional cutting"]
            },
            {
                "rule_id": "aluminum_steel_separation",
                "materials": [MaterialType.ALUMINUM, MaterialType.METAL],
                "proximity": "direct_contact",
                "severity": "caution",
                "message": "Aluminum and steel in direct contact can cause galvanic corrosion in wet conditions.",
                "alternatives": ["Use plastic washers", "Apply protective coating", "Avoid moisture exposure"]
            },
            {
                "rule_id": "plastic_heat_safety",
                "materials": [MaterialType.PLASTIC],
                "operations": ["heating", "welding"],
                "severity": "warning",
                "message": "Heating plastic can release toxic fumes. Ensure proper ventilation.",
                "alternatives": ["Cold forming", "Mechanical fasteners", "Use in ventilated area"]
            },
            {
                "rule_id": "sharp_edge_protection",
                "materials": [MaterialType.ALUMINUM, MaterialType.METAL, MaterialType.GLASS],
                "operations": ["cutting", "handling"],
                "severity": "caution",
                "message": "Sharp edges created during cutting pose injury risk.",
                "alternatives": ["File smooth", "Use edge protection", "Wear protective gloves"]
            }
        ]

    def _initialize_project_patterns(self) -> Dict[str, Dict[str, Any]]:
        """Initialize common project patterns and successful combinations."""
        return {
            "storage_container": {
                "primary_materials": [MaterialType.PLASTIC, MaterialType.CARDBOARD],
                "supporting_materials": [MaterialType.ALUMINUM, MaterialType.FABRIC],
                "complexity": "simple",
                "tools": ["craft knife", "adhesive", "ruler"],
                "success_rate": 0.9,
                "variations": [
                    "Drawer organizer", "Desktop storage", "Garage organization"
                ]
            },
            "decorative_display": {
                "primary_materials": [MaterialType.GLASS, MaterialType.WOOD],
                "supporting_materials": [MaterialType.ALUMINUM, MaterialType.FABRIC],
                "complexity": "moderate",
                "tools": ["glass cutter", "wood finish", "mounting hardware"],
                "success_rate": 0.7,
                "variations": [
                    "Picture frame", "Display shelf", "Accent lighting"
                ]
            },
            "functional_tool": {
                "primary_materials": [MaterialType.ALUMINUM, MaterialType.WOOD],
                "supporting_materials": [MaterialType.RUBBER, MaterialType.PLASTIC],
                "complexity": "moderate",
                "tools": ["drill", "file", "assembly hardware"],
                "success_rate": 0.8,
                "variations": [
                    "Specialized holder", "Workshop aid", "Garden tool"
                ]
            },
            "household_furniture": {
                "primary_materials": [MaterialType.WOOD, MaterialType.CARDBOARD],
                "supporting_materials": [MaterialType.FABRIC, MaterialType.PLASTIC],
                "complexity": "complex",
                "tools": ["saw", "drill", "fasteners", "finish"],
                "success_rate": 0.6,
                "variations": [
                    "Small table", "Storage bench", "Shelving unit"
                ]
            }
        }

    def get_material_affordance(self, material_type: MaterialType) -> Optional[MaterialAffordance]:
        """Get affordance data for a specific material type."""
        return self.affordances.get(material_type)

    def get_material_by_name(self, material_name: str) -> Optional[MaterialType]:
        """Convert material name string to MaterialType enum."""
        material_name = material_name.lower().strip()

        # Direct matches
        for mat_type in MaterialType:
            if mat_type.value.lower() == material_name:
                return mat_type

        # Fuzzy matching for common variations
        material_map = {
            "metal": MaterialType.METAL,
            "aluminum": MaterialType.ALUMINUM,
            "aluminium": MaterialType.ALUMINUM,
            "plastic": MaterialType.PLASTIC,
            "pet": MaterialType.PLASTIC,
            "hdpe": MaterialType.PLASTIC,
            "glass": MaterialType.GLASS,
            "cardboard": MaterialType.CARDBOARD,
            "paper": MaterialType.PAPER,
            "wood": MaterialType.WOOD,
            "timber": MaterialType.WOOD,
            "fabric": MaterialType.FABRIC,
            "cloth": MaterialType.FABRIC,
            "textile": MaterialType.FABRIC,
            "ceramic": MaterialType.CERAMIC,
            "rubber": MaterialType.RUBBER
        }

        return material_map.get(material_name)

    def assess_material_compatibility(self, materials: List[MaterialType]) -> Dict[str, Any]:
        """Assess compatibility between multiple materials."""
        compatibility_score = 1.0
        warnings = []
        blocked_combinations = []

        for i, mat1 in enumerate(materials):
            affordance1 = self.affordances.get(mat1)
            if not affordance1:
                continue

            for mat2 in materials[i+1:]:
                if mat2 in affordance1.incompatible_materials:
                    compatibility_score *= 0.5
                    warnings.append(f"{mat1.value} and {mat2.value} have compatibility issues")

        # Check safety rules
        for rule in self.safety_rules:
            rule_materials = rule.get("materials", [])
            if all(mat in materials for mat in rule_materials):
                if rule.get("severity") == "dangerous":
                    blocked_combinations.append(rule["message"])
                    compatibility_score = 0.0
                elif rule.get("severity") == "warning":
                    warnings.append(rule["message"])
                    compatibility_score *= 0.7

        return {
            "compatibility_score": compatibility_score,
            "warnings": warnings,
            "blocked_combinations": blocked_combinations,
            "is_safe": len(blocked_combinations) == 0
        }

    def suggest_project_type(self, materials: List[MaterialType]) -> Dict[str, Any]:
        """Suggest appropriate project types based on available materials."""
        suggestions = []

        for pattern_name, pattern_data in self.project_patterns.items():
            primary_match = any(mat in materials for mat in pattern_data["primary_materials"])
            supporting_match = any(mat in materials for mat in pattern_data.get("supporting_materials", []))

            if primary_match:
                score = 0.7 if supporting_match else 0.5
                suggestions.append({
                    "project_type": pattern_name,
                    "score": score,
                    "complexity": pattern_data["complexity"],
                    "success_rate": pattern_data["success_rate"],
                    "variations": pattern_data["variations"]
                })

        # Sort by score
        suggestions.sort(key=lambda x: x["score"] * x["success_rate"], reverse=True)

        return {
            "suggestions": suggestions[:5],  # Top 5 suggestions
            "total_options": len(suggestions)
        }

    def get_safety_assessment(self, materials: List[MaterialType], operations: List[str]) -> Dict[str, Any]:
        """Comprehensive safety assessment for materials and operations."""
        safety_level = SafetyLevel.SAFE
        safety_notes = []
        blocked_operations = []
        required_ppe = set()

        for material in materials:
            affordance = self.affordances.get(material)
            if affordance:
                if affordance.safety_level.value == "dangerous":
                    safety_level = SafetyLevel.DANGEROUS
                elif affordance.safety_level.value == "warning" and safety_level != SafetyLevel.DANGEROUS:
                    safety_level = SafetyLevel.WARNING
                elif affordance.safety_level.value == "caution" and safety_level == SafetyLevel.SAFE:
                    safety_level = SafetyLevel.CAUTION

                safety_notes.extend(affordance.safety_notes)

                # Add material-specific PPE requirements
                if material == MaterialType.GLASS:
                    required_ppe.add("safety glasses")
                    required_ppe.add("cut-resistant gloves")
                elif material in [MaterialType.ALUMINUM, MaterialType.METAL]:
                    required_ppe.add("work gloves")
                elif material == MaterialType.WOOD:
                    required_ppe.add("safety glasses")
                    required_ppe.add("dust mask")

        # Check operation-specific safety rules
        for rule in self.safety_rules:
            if any(mat in materials for mat in rule.get("materials", [])):
                if any(op in operations for op in rule.get("operations", [])):
                    if rule["severity"] == "dangerous":
                        blocked_operations.append(rule["message"])
                    else:
                        safety_notes.append(rule["message"])

        return {
            "safety_level": safety_level.value,
            "safety_notes": list(set(safety_notes)),  # Remove duplicates
            "blocked_operations": blocked_operations,
            "required_ppe": list(required_ppe),
            "is_safe_to_proceed": len(blocked_operations) == 0
        }


# Global knowledge base instance
material_kb = MaterialAffordanceKnowledgeBase()