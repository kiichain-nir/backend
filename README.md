# Nirbhik

**Nirbhik** is a solution for managing projects, vendors, beneficiaries, and more. It uses Prisma as the ORM and integrates services like mailing and authentication.

## Project Structure

Details the app's structure, including services and modules.

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**  
   Copy the `.env` file and configure the necessary variables.

## Environment Variables

The application requires environment variables defined in the `.env` file, such as database credentials and service configurations.

## Database Setup

1. **Start the database using Docker:**
   ```bash
   docker-compose -f pg-setup.compose up -d
   ```
2. **Run Prisma migrations:**
   ```bash
   npx prisma migrate dev
   ```
3. **Seed the database:**
   ```bash
   npx prisma db seed
   ```

## Running the Application

- **Development mode:**
  ```bash
  npm run dev
  ```
- **Production mode:**
  ```bash
  npm run start
  ```

## Swagger Documentation

Access Swagger documentation at `http://localhost:<PORT>/swagger`, replacing `<PORT>` with the port specified in your `.env` file.

## Testing

- **Run unit tests:**
  ```bash
  npm run test
  ```
- **Run end-to-end tests:**
  ```bash
  npm run test:e2e
  ```
- **Run tests with coverage:**
  ```bash
  npm run test:coverage
  ```

## Scripts

- **Build:** `npm run build`
- **Format:** `npm run format`
- **Lint:** `npm run lint`
- **Start:** `npm run start`
- **Start (Development):** `npm run dev`
- **Start (Debug):** `npm run start:debug`
- **Migrate (Development):** `npm run migrate:dev`
- **Migrate (Deploy):** `npm run migrate:deploy`
- **Prisma Studio:** `npm run prisma:studio`
