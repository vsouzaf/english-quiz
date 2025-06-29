# Base image to build
FROM golang:1.24-alpine AS base

WORKDIR /app

# Copy Go files
COPY go.mod ./
COPY main.go ./

# Download dependencies (generates go.sum too)
RUN go mod tidy

# Copy everything else
COPY . .

# Build the binary
RUN go build -o main .

# ========== Dev stage (with Air hot reload) ==========
FROM base AS dev

RUN go install github.com/air-verse/air@latest

EXPOSE 80

CMD ["air", "-c", ".air.toml"]

# ========== Production stage ==========
FROM alpine:latest AS prod

WORKDIR /app

COPY --from=base /app/main .

EXPOSE 80

CMD ["./main"]