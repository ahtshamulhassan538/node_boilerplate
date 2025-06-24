
# Node.js Boilerplate

A scalable and production-ready Node.js boilerplate built with best practices in mind. It provides a solid foundation for building RESTful APIs with Express, supporting a modular architecture, job scheduling, file handling, multi-language support, and more.

---

## 🧰 Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework
- **Multer** – File uploads
- **Nodemailer** – Email service
- **ExcelJS & csv-parser** – For Excel/CSV import/export
- **Dotenv** – Environment variable management
- **Joi or Custom Validation** – For request validation
- **Mongoose (if used)** – MongoDB ORM
- **Docker** – Containerization

---

## 📁 Folder Structure

```
node_boilerplate/
├── app.js                 # Main app config (Express setup)
├── index.js               # Server entry point
├── Dockerfile             # For Docker containerization
├── .env / .env.example    # Environment variables
├── package.json           # Dependencies and scripts
├── src/
│   ├── config/            # App configs (DB, mail, etc.)
│   ├── constants/         # Constant values used throughout
│   ├── controllers/       # Express route handlers
│   ├── cronJobs/          # Cron job task files
│   ├── emailTemplates/    # Email HTML/text templates
│   ├── helpers/           # Shared helper functions
│   ├── lang/              # Language files for localization
│   ├── middlewares/       # Middleware (auth, error handling, etc.)
│   ├── models/            # Database schemas/models
│   ├── repositories/      # Data-access logic
│   ├── routes/            # Route definitions
│   ├── seeders/           # DB seed scripts
│   ├── services/          # Business logic
│   ├── utils/             # Reusable utilities
│   └── validations/       # Request validation logic
```

---

## 🔧 Utilities Breakdown (`src/utils/`)

| File | Purpose |
|------|---------|
| **apiResponseUtil.js** | Centralizes all API responses (success, error, pagination, etc.). |
| **cronManagerUtil.js** | Manages creation and lifecycle of scheduled cron jobs. |
| **CsvParserUtil.js** | Converts uploaded CSV files to JSON arrays for import. |
| **fileUploadUtil.js** | Manages file upload configurations (storage, type restrictions, etc.). |
| **importExportExcelUtil.js** | Reads and writes Excel files using ExcelJS. |
| **langUtil.js** | Loads multilingual content dynamically from `lang/`. |
| **loggerUtil.js** | Logs requests and events (can be extended with Winston or Morgan). |
| **sendMailUtil.js** | Abstracts email sending via Gmail, Mailtrap, or AWS SES. |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/node_boilerplate.git
cd node_boilerplate
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment

```bash
cp .env.example .env
```

Edit `.env` with actual values:
```
PORT=3000
DB_URI=mongodb://localhost:27017/your-db
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=username
EMAIL_PASS=password
```

### 4. Run the project

```bash
npm run dev
```

---

## 🧪 Running in Production

```bash
npm run start
```

---

## 📬 Email Support

- Define templates in `src/emailTemplates/`.
- Use `sendMailUtil.js` to send transactional emails.
- Supports nodemailer with multiple providers.
- SES,mailtrap and SMTP support for sending emails

---

## 🕒 Cron Jobs

- Add cron tasks to `src/cronJobs/`.
- Use `cronManagerUtil.js` to manage them.

---

## 📦 File Uploads

- Multer is configured in `fileUploadUtil.js`.
- Supports CSV, image files, and more.
- Uploads saved in `/uploads` directory (or custom path).
- You can upload on S3 or local

---

## 📊 CSV/Excel Import

- Upload CSVs → parsed by `CsvParserUtil.js`.
- Upload Excel → handled by `importExportExcelUtil.js`.

---

## 🔐 Validation

- Define validation schemas inside `src/validations/`.
- Integrate via middleware in your routes.

---

## 📚 Localization

- Store translations in `src/lang/en.json`, `src/lang/ur.json`, etc.
- Access them dynamically using `langUtil.js`.

---

## 🧹 Code Quality

- Follow MVC + SRP (single-responsibility principle).
- Use `services` and `repositories` to separate business and data logic.
- All utilities are reusable and testable.

---

## 🐳 Docker Support

To build and run the app in a container:

```bash
docker build -t node-boilerplate .
docker run -p 3000:3000 --env-file .env node-boilerplate
```

---

## 🧪 Testing (Recommended Setup)

This boilerplate can be extended easily using:

- **Jest** – for unit tests
- **Supertest** – for API endpoint testing

---

## 📌 Future Improvements

- Add Swagger API documentation
- Add Role-Based Access Control (RBAC)
- Integrate Redis or Caching mechanism
- Add CLI-based Seeder/Job runner

---

## 🧠 Contributing

Contributions are welcome! Please fork the repo and submit a pull request.

---

## 📝 License

This project is licensed under the MIT License.