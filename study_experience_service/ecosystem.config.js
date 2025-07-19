module.exports = {
  apps: [
    {
      name: 'study-experience-service',
      script: 'dist/main.js',
      instances: 'max', // Usa todas as CPUs disponíveis
      exec_mode: 'cluster', // Modo cluster para balanceamento de carga
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 80
      },
      // Configurações de monitoramento e restart
      watch: false, // Desabilita watch em produção
      max_memory_restart: '1G', // Restart se usar mais de 1GB de RAM
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true, // Adiciona timestamp nos logs
      // Configurações de restart
      min_uptime: '10s', // Tempo mínimo para considerar app como "started"
      max_restarts: 10, // Máximo de restarts antes de parar
      restart_delay: 4000, // Delay entre restarts
      // Configurações de health check
      health_check_grace_period: 3000,
      // Configurações de performance
      node_args: '--max-old-space-size=1024', // Limita heap a 1GB
      // Configurações de segurança
      uid: 'nestjs',
      gid: 'nodejs'
    }
  ]
}; 