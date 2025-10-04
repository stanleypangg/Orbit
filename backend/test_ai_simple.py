#!/usr/bin/env python3
"""
Simple AI agent test focusing on core functionality without Redis dependency.
"""
import asyncio
import os
import sys
import logging

# Set up test environment
os.environ['ENVIRONMENT'] = 'development'
if os.path.exists('.env.test'):
    from dotenv import load_dotenv
    load_dotenv('.env.test')

# Configure logging
logging.basicConfig(level=logging.WARNING)  # Reduce noise

from app.workflows.nodes import call_ai_agent, USE_PRODUCTION_CLIENT
from app.core.config import settings

async def test_basic_ai():
    """Test basic AI functionality"""
    print("🤖 Testing Basic AI Agent...")
    print(f"Production Client: {USE_PRODUCTION_CLIENT}")
    print(f"API Key Configured: {bool(settings.GEMINI_API_KEY)}")

    try:
        # Simple text generation
        response = await call_ai_agent(
            prompt="Respond with exactly the text: WORKING",
            task_type="default"
        )

        print(f"Response type: {type(response)}")
        print(f"Response: {response}")

        # Check if we got a working response
        if isinstance(response, dict):
            if "text" in response and "WORKING" in response["text"]:
                print("✅ Basic AI agent is working!")
                return True
            elif "WORKING" in str(response):
                print("✅ Basic AI agent is working (structured response)!")
                return True

        print("❌ AI agent response not as expected")
        return False

    except Exception as e:
        print(f"❌ AI agent test failed: {str(e)}")
        return False

async def test_structured_output():
    """Test structured JSON output"""
    print("\n📋 Testing Structured Output...")

    schema = {
        "type": "object",
        "properties": {
            "items": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "name": {"type": "string"},
                        "material": {"type": "string"}
                    }
                }
            }
        }
    }

    try:
        response = await call_ai_agent(
            prompt="Extract items from: 'plastic bottle and aluminum can'. Return as JSON array with name and material fields.",
            task_type="extraction",
            response_schema=schema
        )

        print(f"Structured response: {response}")

        # Validate structure
        if isinstance(response, dict) and "items" in response:
            items = response["items"]
            if len(items) >= 2:
                print("✅ Structured output is working!")
                return True

        print("❌ Structured output not as expected")
        return False

    except Exception as e:
        print(f"❌ Structured output test failed: {str(e)}")
        return False

async def test_ingredient_extraction():
    """Test ingredient extraction logic"""
    print("\n🥤 Testing Ingredient Extraction...")

    schema = {
        "type": "object",
        "properties": {
            "ingredients": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "name": {"type": "string"},
                        "size": {"type": "string"},
                        "material": {"type": "string"},
                        "confidence": {"type": "number"}
                    }
                }
            }
        }
    }

    try:
        response = await call_ai_agent(
            prompt="""Extract recyclable items from: "I have 3 plastic water bottles and 2 aluminum cans"

            For each item provide:
            - name: specific item name
            - size: any size mentioned or "unknown"
            - material: the material type
            - confidence: confidence score 0-1""",
            task_type="extraction",
            response_schema=schema
        )

        print(f"Extraction response: {response}")

        if isinstance(response, dict) and "ingredients" in response:
            ingredients = response["ingredients"]
            print(f"Extracted {len(ingredients)} ingredients")

            # Check for expected materials
            materials = [item.get("material", "").lower() for item in ingredients]
            has_plastic = any("plastic" in mat for mat in materials)
            has_aluminum = any("aluminum" in mat for mat in materials)

            if has_plastic and has_aluminum:
                print("✅ Ingredient extraction is working!")
                return True
            else:
                print(f"❌ Missing expected materials. Found: {materials}")

        return False

    except Exception as e:
        print(f"❌ Ingredient extraction test failed: {str(e)}")
        return False

async def main():
    """Run all simple tests"""
    print("🚀 Simple AI Agent Tests")
    print("=" * 50)

    tests = [
        ("Basic AI", test_basic_ai),
        ("Structured Output", test_structured_output),
        ("Ingredient Extraction", test_ingredient_extraction)
    ]

    passed = 0
    total = len(tests)

    for test_name, test_func in tests:
        print(f"\n🧪 {test_name}")
        try:
            if await test_func():
                passed += 1
        except Exception as e:
            print(f"❌ {test_name} failed with exception: {str(e)}")

    print(f"\n{'='*50}")
    print(f"Results: {passed}/{total} tests passed")
    print(f"Success rate: {(passed/total*100):.1f}%")

    return passed == total

if __name__ == "__main__":
    try:
        success = asyncio.run(main())
        sys.exit(0 if success else 1)
    except KeyboardInterrupt:
        print("\n🛑 Tests interrupted")
        sys.exit(1)