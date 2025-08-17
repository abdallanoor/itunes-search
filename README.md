# Fullstack Podcast Search App

هذا المشروع عبارة عن تكليف مطور متكامل لشركة ثمانية، يتكون من جزئين:

- **Frontend**: Next.js, Tailwind CSS, shadcn/ui, TypeScript
- **Backend**: Nest.js, DynamoDB, AWS

## المشاريع

- **backend/**: Nest.js API → Endpoints للبحث وعرض الحلقات
- **frontend/**: Next.js UI → واجهة لعرض نتائج البحث وتشغيل الحلقات

## المميزات

- البحث في iTunes API وعرض النتائج.
- حفظ النتائج في DynamoDB مع كاش لتسريع الأداء.
- عرض تفاصيل البودكاست والحلقات.
- تشغيل الحلقات من الواجهة الأمامية.
- دعم الثيم الفاتح والداكن.

## Quick Start

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run start:dev
```

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

### Open App

```bash
http://localhost:3000
```

- ابحث عن بودكاست بالكلمة المفتاحية.
- اعرض الحلقات وشغل أي حلقة.

## Endpoints

- **GET /api/podcasts?term={keyword}**  
  يستقبل كلمة بحث ويجلب النتائج من iTunes API (مع تخزينها في DynamoDB + Cache).

- **GET /api/episodes?podcastId=${id}**  
  يسترجع قائمة الحلقات الخاصة ببودكاست محدد عبر الـ podcastId.
