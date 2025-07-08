import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { addCredits } from '@/lib/credits';
import { addRaffleEntry } from '@/lib/raffle-store';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_...', {
//   apiVersion: '2024-04-10',
// });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_...', {
  // apiVersion: '2024-04-10', // Use the latest known supported version (check on Stripe docs or npm)
});


export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = headers().get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || 'whsec_...'
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId || 'demo-user';
      
      // Add 10 credits for successful payment
      addCredits(userId, 10);
      
      // Add raffle entry
      addRaffleEntry(userId, 7);
      
      console.log(`Added 10 credits and raffle entry for user ${userId}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
}