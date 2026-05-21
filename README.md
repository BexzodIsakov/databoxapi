# DataboxAPI

Free fake REST API for frontend prototyping and testing.

**Live:** [databoxapi.com](https://databoxapi.com) &nbsp;·&nbsp; **Docs:** [databoxapi.com/docs](https://databoxapi.com/docs)

## Endpoints

| Resource | URL |
|---|---|
| Products | `GET /api/products` |
| Categories | `GET /api/categories` |
| Brands | `GET /api/brands` |
| Users | `GET /api/users` |

## Products filters

`category` · `brand` · `minPrice` · `maxPrice` · `inStock` · `minDiscount` · `minRating` · `tags` · `sortBy` · `order` · `page` · `limit`

```
GET /api/products?category=electronics&sortBy=price&order=desc&page=1&limit=10
```

## Write operations

POST / PUT / PATCH / DELETE are supported on `/products` and `/users`. They validate input and return the expected response but **do not modify the database**.

## Stack

Node.js · Express · MongoDB Atlas · EJS · Tailwind CSS

## Local setup

```bash
npm run dev
npm run build:css  # watch mode
```

Requires `.env.local` with `MONGODB_URI`.
