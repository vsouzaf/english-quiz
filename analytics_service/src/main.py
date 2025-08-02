import uvicorn
import os
from src.app.bootstrap import create_app

# Criar a instância da aplicação
app = create_app()

if __name__ == "__main__":
    # Configurações do servidor
    port = int(os.getenv("PORT", "80"))
    host = os.getenv("HOST", "0.0.0.0")
    
    uvicorn.run(
        "src.main:app",
        host=host,
        port=port,
        reload=True  # Para desenvolvimento
    )