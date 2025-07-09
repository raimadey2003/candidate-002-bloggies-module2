# Meme Bot Pro - Tech Assessment Module 2

A beautiful, production-ready meme generator with Stripe integration, credit system, and raffle functionality.

## 🚀 Features

- **Meme Generation**: Create 500x500 PNG memes with custom text
- **Credit System**: 2 credits per meme, 10 credits per $7 purchase
- **Stripe Integration**: Secure payment processing with webhooks
- **Raffle System**: Automatic entry after successful payments
- **Modern UI**: Beautiful, responsive design with animations

## 🛠️ Tech Stack

- **Frontend**: Next.js 13, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Lucide React icons
- **Payments**: Stripe Checkout & Webhooks
- **Storage**: In-memory store (JSON file compatible)
- **Canvas**: HTML5 Canvas for meme generation

## 📦 Set Up & Installation

1. Clone the repository:
```bash
git clone https://github.com/raimadey2003/candidate-002-bloggies-module2.git
cd candidate-002-bloggies-module2
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Stripe keys:
```env
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 🏃‍♂️ Running the Application

### Development
```bash
npm run dev
```

## 🚀 Deployment

https://candidate-002-bloggies-module2.vercel.app/



### Testing
```bash
# Test meme generation endpoint
curl -X POST http://localhost:3000/api/generate-meme \
  -H "Content-Type: application/json" \
  -d '{"text": "TOP TEXT|BOTTOM TEXT", "userId": "demo-user"}'

# Test checkout creation
curl -X POST http://localhost:3000/api/create-checkout \
  -H "Content-Type: application/json" \
  -d '{"userId": "demo-user"}'

# Test credit retrieval
curl http://localhost:3000/api/credits?userId=demo-user
```

## 🎯 API Endpoints

### POST /api/generate-meme
Generates a 500x500 PNG meme with custom text.

**Request:**
```json
{
  "text": "TOP TEXT|BOTTOM TEXT",
  "userId": "demo-user"
}
```

**Response:**
```json
{
  "imageData": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIi...",
  "altText": "Meme with text: \"TOP TEXT\" and \"BOTTOM TEXT\"",
  "width": 500,
  "height": 500,
  "creditsRemaining": 3
}
```

### POST /api/create-checkout
Creates a Stripe checkout session for $7.

**Request:**
```json
{
  "userId": "demo-user"
}
```

**Response:**
```json
{
  "sessionId": "cs_test_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6"
}
```

### POST /api/webhook
Handles Stripe webhooks for payment completion.

### GET /api/credits
Retrieves current credit balance for a user.

## 🎮 Demo Usage

1. Visit the homepage
2. Start with 10 demo credits
3. Generate memes (2 credits each)
4. Purchase more credits ($7 for 10 credits)
5. Get automatically entered in weekly raffle
6. Download generated memes

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `STRIPE_SECRET_KEY` | Stripe secret key (test mode) | Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes |
| `NEXT_PUBLIC_BASE_URL` | Base URL for redirects | Yes |




## 🎨 Design Features

- **Gradient Backgrounds**: Purple to blue gradients throughout
- **Modern Cards**: Clean, shadowed card layouts
- **Smooth Animations**: Hover effects and micro-interactions
- **Responsive Design**: Works on all device sizes
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🧪 Testing

Sample responses are available in the `/samples` directory:
- `meme-response.json`: Sample meme generation response
- `checkout-response.json`: Sample checkout session response

## 🔒 Security

- Stripe webhook signature verification
- Input validation on all endpoints
- Rate limiting considerations
- Secure credit deduction logic

---

Built by Raima Dey
```
Linkedin : https://www.linkedin.com/in/raima-dey-13426a351/
E-Mail : raimadey9836@gmail.com
```
