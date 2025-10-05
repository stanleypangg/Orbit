# Environment Variables

## Required Variables

Create a `.env.local` file in the frontend directory with the following variables:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Usage

The `NEXT_PUBLIC_API_URL` variable is used throughout the application to connect to the backend API.

- **Development**: Defaults to `http://localhost:8000` if not set
- **Production**: Set to your production API URL

## Example

For production deployment:

```bash
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```
