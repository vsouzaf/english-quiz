from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
async def health_check():
    """
    Endpoint de health check para verificar se o serviço está funcionando
    """
    return {
        "status": "healthy",
        "service": "analytics_service",
        "version": "1.0.0"
    }

@router.get("/")
async def root():
    """
    Endpoint raiz do serviço
    """
    return {
        "message": "Analytics Service API",
        "version": "1.0.0",
        "docs": "/docs"
    }