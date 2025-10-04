#!/usr/bin/env python3
"""
Test the complete AI workflow via API calls.
"""
import requests
import json
import time
import sys

BASE_URL = "http://localhost:8000"

def test_complete_api_workflow():
    """Test the complete workflow via API"""
    print("🚀 Testing Complete AI Workflow via API")
    print("=" * 60)

    # Step 1: Start workflow
    print("\n🔧 Step 1: Starting workflow...")
    start_response = requests.post(f"{BASE_URL}/workflow/start",
        json={
            "user_input": "I have 5 plastic water bottles, 3 aluminum cans, and some cardboard boxes that I want to turn into something useful"
        }
    )

    if start_response.status_code == 200:
        start_data = start_response.json()
        thread_id = start_data["thread_id"]
        print(f"✅ Workflow started: {thread_id}")
    else:
        print(f"❌ Failed to start workflow: {start_response.status_code}")
        return False

    # Step 2: Monitor progress
    print(f"\n🔍 Step 2: Monitoring AI processing...")
    max_wait = 30  # seconds
    start_time = time.time()

    while time.time() - start_time < max_wait:
        status_response = requests.get(f"{BASE_URL}/workflow/status/{thread_id}")

        if status_response.status_code == 200:
            status = status_response.json()
            print(f"  Phase: {status['current_phase']}")
            print(f"  Node: {status['current_node']}")
            print(f"  Ingredients: {status['ingredients_count']}")
            print(f"  Completion: {status['completion_percentage']:.1f}%")

            # Check if AI needs clarification
            if status.get("needs_user_input"):
                print(f"  🤖 AI Questions: {status['user_questions']}")

                # Provide clarification
                print(f"\n💬 Step 3: Providing clarification...")
                resume_response = requests.post(f"{BASE_URL}/workflow/resume/{thread_id}",
                    json={
                        "user_input": "The bottles are 16oz plastic water bottles, the cans are 12oz aluminum soda cans, and the cardboard boxes are medium-sized Amazon delivery boxes"
                    }
                )

                if resume_response.status_code == 200:
                    print("✅ Clarification provided")
                else:
                    print(f"❌ Failed to provide clarification: {resume_response.status_code}")

            # Check if moved to next phase
            if status['current_phase'] != 'ingredient_discovery':
                print(f"✅ Phase completed: {status['current_phase']}")
                break

        time.sleep(2)

    # Step 3: Get final ingredients
    print(f"\n📦 Step 4: Getting AI-extracted ingredients...")
    ingredients_response = requests.get(f"{BASE_URL}/workflow/ingredients/{thread_id}")

    if ingredients_response.status_code == 200:
        ingredients_data = ingredients_response.json()
        ingredients = ingredients_data.get("ingredients", [])

        print(f"✅ AI extracted {len(ingredients)} ingredients:")
        for i, ingredient in enumerate(ingredients, 1):
            print(f"  {i}. {ingredient.get('name', 'Unknown')} ({ingredient.get('material', 'unknown material')})")
            if ingredient.get('size'):
                print(f"     Size: {ingredient['size']}")
            if ingredient.get('condition'):
                print(f"     Condition: {ingredient['condition']}")

        return True
    else:
        print(f"❌ Failed to get ingredients: {ingredients_response.status_code}")
        return False

def test_health():
    """Test API health"""
    print("🏥 Testing API Health...")

    try:
        # Test main health
        health_response = requests.get(f"{BASE_URL}/health")
        if health_response.status_code == 200:
            health_data = health_response.json()
            print(f"✅ Main API: {health_data['status']}")

        # Test workflow health
        workflow_health = requests.get(f"{BASE_URL}/workflow/health")
        if workflow_health.status_code == 200:
            workflow_data = workflow_health.json()
            print(f"✅ Workflow API: {workflow_data['status']}")

        # Test AI health
        ai_health = requests.get(f"{BASE_URL}/ai/health")
        if ai_health.status_code == 200:
            ai_data = ai_health.json()
            print(f"✅ AI Service: {ai_data['overall_status']}")

        return True

    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to API - make sure server is running on http://localhost:8000")
        return False
    except Exception as e:
        print(f"❌ Health check failed: {str(e)}")
        return False

if __name__ == "__main__":
    print("🧪 AI Agent API Integration Test")
    print("Make sure the server is running: uvicorn main:app --reload")
    print()

    # Test health first
    if not test_health():
        print("\n❌ API not available - start the server first!")
        sys.exit(1)

    # Test complete workflow
    if test_complete_api_workflow():
        print("\n🎉 AI Agent API Integration Test PASSED!")
        print("\n🌐 Try the interactive docs at: http://localhost:8000/docs")
    else:
        print("\n❌ API Integration Test FAILED")
        sys.exit(1)