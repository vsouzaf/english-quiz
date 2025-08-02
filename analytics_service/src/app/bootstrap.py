from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.routes import health, analytics

def create_app() -> FastAPI:
    """
    Factory function para criar a instância do FastAPI
    """
    app = FastAPI(
        title="Analytics Service",
        description="Serviço de análise de dados e métricas",
        version="1.0.0",
        docs_url="/docs",
        redoc_url="/redoc"
    )

    # Configurar CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # Em produção, especifique domínios específicos
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Incluir rotas
    app.include_router(health.router, tags=["Health"])
    app.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])

    return app