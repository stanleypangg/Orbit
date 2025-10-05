"""
Package endpoint for retrieving Phase 4 final package data.
"""
from fastapi import APIRouter, HTTPException
from typing import Dict, Any
import json
import logging

from app.core.redis import redis_service

logger = logging.getLogger(__name__)
router = APIRouter()


@router.get("/package/{thread_id}")
async def get_final_package(thread_id: str) -> Dict[str, Any]:
    """
    Retrieve the final package data for a given thread ID.
    
    Args:
        thread_id: Thread identifier for the workflow
        
    Returns:
        Final package data including ESG metrics, tools, materials, instructions
        
    Raises:
        HTTPException: 404 if package not found
    """
    try:
        # Try to get full package first
        package_key = f"final_package:{thread_id}"
        package_data = redis_service.get(package_key)
        
        if package_data:
            parsed_data = json.loads(package_data)
            logger.info(f"Retrieved final package for thread {thread_id}")
            logger.info(f"  - Keys in package: {list(parsed_data.keys())}")
            logger.info(f"  - Has detailed_esg_metrics: {'detailed_esg_metrics' in parsed_data}")
            if 'detailed_esg_metrics' in parsed_data:
                logger.info(f"  - ESG keys: {list(parsed_data['detailed_esg_metrics'].keys()) if parsed_data['detailed_esg_metrics'] else 'None'}")
            return parsed_data
        
        # If not found, check for essential package
        essential_key = f"package_essential:{thread_id}"
        essential_data = redis_service.get(essential_key)
        
        if essential_data:
            logger.info(f"Retrieved essential package for thread {thread_id}")
            return json.loads(essential_data)
        
        # Not found
        logger.warning(f"No package found for thread {thread_id}")
        raise HTTPException(
            status_code=404,
            detail=f"No package data found for thread {thread_id}. Workflow may not be complete."
        )
        
    except json.JSONDecodeError as e:
        logger.error(f"Failed to decode package data for thread {thread_id}: {e}")
        raise HTTPException(
            status_code=500,
            detail="Package data is corrupted"
        )
    except Exception as e:
        logger.error(f"Error retrieving package for thread {thread_id}: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to retrieve package: {str(e)}"
        )


@router.get("/package/{thread_id}/esg")
async def get_esg_metrics(thread_id: str) -> Dict[str, Any]:
    """
    Retrieve detailed ESG metrics for a given thread ID.
    
    Args:
        thread_id: Thread identifier for the workflow
        
    Returns:
        Detailed ESG metrics including carbon, water, and circularity scores
        
    Raises:
        HTTPException: 404 if metrics not found
    """
    try:
        esg_key = f"esg_metrics:{thread_id}"
        esg_data = redis_service.get(esg_key)
        
        if esg_data:
            logger.info(f"Retrieved ESG metrics for thread {thread_id}")
            return json.loads(esg_data)
        
        # Fallback: try to extract from full package
        package_key = f"final_package:{thread_id}"
        package_data = redis_service.get(package_key)
        
        if package_data:
            package = json.loads(package_data)
            esg = package.get("detailed_esg_metrics", {})
            if esg:
                return esg
        
        raise HTTPException(
            status_code=404,
            detail=f"No ESG metrics found for thread {thread_id}"
        )
        
    except Exception as e:
        logger.error(f"Error retrieving ESG metrics for thread {thread_id}: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to retrieve ESG metrics: {str(e)}"
        )


@router.get("/package/{thread_id}/tools")
async def get_tools_and_materials(thread_id: str) -> Dict[str, Any]:
    """
    Retrieve detailed tools and materials for a given thread ID.
    
    Args:
        thread_id: Thread identifier for the workflow
        
    Returns:
        Detailed tools and materials with icons and purposes
        
    Raises:
        HTTPException: 404 if data not found
    """
    try:
        tools_key = f"tools_materials:{thread_id}"
        tools_data = redis_service.get(tools_key)
        
        if tools_data:
            logger.info(f"Retrieved tools/materials for thread {thread_id}")
            return json.loads(tools_data)
        
        # Fallback: try to extract from full package
        package_key = f"final_package:{thread_id}"
        package_data = redis_service.get(package_key)
        
        if package_data:
            package = json.loads(package_data)
            tools = package.get("detailed_tools_and_materials", {})
            if tools:
                return tools
        
        raise HTTPException(
            status_code=404,
            detail=f"No tools/materials found for thread {thread_id}"
        )
        
    except Exception as e:
        logger.error(f"Error retrieving tools/materials for thread {thread_id}: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to retrieve tools/materials: {str(e)}"
        )

