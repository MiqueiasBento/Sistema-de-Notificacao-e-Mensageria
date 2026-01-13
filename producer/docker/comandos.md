# Guia Prático: Como rodar o sistema (Frontend) e como buildar/publicar imagens (Backend)

Documento para que:
- os desenvolvedores **frontend** consigam subir o ambiente de *staging* apenas baixando imagens publicadas; 
- os desenvolvedores **backend** buildem, testem e publiquem imagens no Docker Hub.

---

## Instruções para o Frontend (rodar staging)

### Objetivo

Subir o backend (API), banco (Postgres) e pgAdmin usando imagens publicadas no registry — **sem build local do backend.**

### Passo a passo

1. **Obtenha os arquivos necessários** (no repositório do projeto ou compartilhado):

   * `docker-compose.staging.yaml`
   * `.env.staging` (contendo conexões e credenciais de staging)

2. **(Opcional) Pré-puxar imagens** — reduz tempo de `up`:

   ```bash
   docker compose -f docker/docker-compose.staging.yaml pull
   ```

3. **Subir a stack**:

   ```bash
   docker compose -f docker/docker-compose.staging.yaml --env-file env/.env.staging up -d
   ```

4. **Verificações**:

   * Listar containers:

     ```bash
     docker ps --filter "name=erp-api"
     ```
   * Ver logs:

     ```bash
     docker logs -f erp-api
     ```
   * Checar endpoint (exemplo):

     ```bash
     curl -I http://localhost:8080/actuator/health
     ```

5. **Atualizar quando houver nova imagem com mesma tag (`staging`)**:

   ```bash
   docker compose -f docker-compose.staging.yaml pull
   docker compose -f docker-compose.staging.yaml up -d --force-recreate --no-deps erp-api
   ```

---

## Instruções para o Backend (build, teste e publicar imagem)

### Objetivo

Buildar a imagem da API localmente, testar, taggear e enviar ao Docker Hub para que o frontend apenas a consuma.

### Preparar o projeto

1. **Dockerfile recomendado** (multi-stage — exemplo para Spring Boot):

   * Não incluir `.env` ou segredos no Dockerfile.

   ```dockerfile
   # Stage build
   FROM maven:3.9.9-eclipse-temurin-21 AS builder
   WORKDIR /build

   COPY pom.xml mvnw ./
   COPY .mvn .mvn
   COPY src ./src

   RUN mvn -e -B clean package -DskipTests

   # Stage runtime
   FROM eclipse-temurin:21-jdk-alpine
   WORKDIR /app

   COPY --from=builder /build/target/*.jar /app/app.jar

   EXPOSE 8080
   CMD ["java", "-jar", "/app/app.jar"]
   ```
  
### Build local (validar antes de publicar)

1. (Opcional) limpar cache:

   ```bash
   docker builder prune -af
   ```
2. Buildar a imagem (no diretório onde o Dockerfile está):

   ```bash
   para linux
   DOCKER_BUILDKIT=1 docker build -t miqueiasbto/smn-arquitetura:staging -f docker/Dockerfile .

   para windows
   $env:DOCKER_BUILDKIT=1; docker build -t miqueiasbto/smn-arquitetura:staging -f docker/Dockerfile .
   # Exemplo: DOCKER_BUILDKIT=1 docker build -t miqueiasbto/avanttech-jr:staging -f docker/Dockerfile .
   ```
3. Testar localmente passando variáveis de staging (não embutir .env na imagem):

   ```bash
   docker run --rm -p 8080:8080 --env-file env/.env.staging --name temp-erp miqueiasbto/smn-arquitetura:staging
   ```
4. Validar endpoints, logs e comportamento.

### Tag e push

1. Login no Docker Hub (use Access Token como senha):

   ```bash
   docker login
   ```
2. Criar tag versionada (recomendado):

   ```bash
   docker tag miqueiasbto/smn-arquitetura:staging miqueiasbto/smn-arquitetura:1.0.0
   ```
3. Enviar imagens:

   ```bash
   docker push miqueiasbto/smn-arquitetura:staging
   docker push miqueiasbto/smn-arquitetura:1.0.0
   ```
4. Verificar no Docker Hub se as tags foram publicadas corretamente.

### Observações sobre tags

* Usar `staging` para teste rápido é conveniente; porém, **usar tags versionadas** (`v1.2.0`, `2025-11-05`) permite rastrear exatamente qual build foi publicado.
* Se usar sempre a mesma tag (`staging`), combine com `docker compose pull` e `--force-recreate` no host para garantir atualização.
  
---

## Troubleshooting rápido

* `permission denied` ao acessar `/var/run/docker.sock` → adicione usuário ao grupo `docker`.
* `denied: requested access to the resource is denied` no `docker push` → faça `docker login` com usuário correto e token; verifique nome do repo.
* `image not found` no `docker run` ou `docker compose pull` → verifique `image: user/repo:tag` e se o push foi bem-sucedido.
* Build falhando por `...not found` em base image → ajuste a tag da imagem base no Dockerfile (ex.: `maven:3.9.9-eclipse-temurin-21`, `eclipse-temurin:21-jdk-alpine`).
  
---
