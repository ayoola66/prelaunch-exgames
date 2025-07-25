// client.js (static version)

let cfg;
fetch('config.json')
  .then(r => r.json())
  .then(c => { cfg = c; init(); });

function init() {
  const stripe = Stripe(cfg.stripe.mode === 'live' ? cfg.stripe.pk_live : cfg.stripe.pk_test);

  function goCheckout() {
    stripe.redirectToCheckout({
      lineItems: [{ price: cfg.stripe.priceId, quantity: 1 }],
      mode: 'subscription',
      successUrl: 'https://ayoola.me/agency/success.html',
      cancelUrl: 'https://ayoola.me/agency/'
    });
  }

  document.getElementById('cta-primary').addEventListener('click', goCheckout);
  document.getElementById('cta-secondary').addEventListener('click', goCheckout);
}

/*
let cfg;
fetch('config.json')
  .then(r => r.json())
  .then(c => { cfg = c; init(); });

function init() {
  const stripe = Stripe(cfg.stripe.mode === 'live' ? cfg.stripe.pk_live : cfg.stripe.pk_test);

  document.getElementById('checkout-btn').addEventListener('click', () => {
    stripe.redirectToCheckout({
      lineItems: [{ price: cfg.stripe.priceId, quantity: 1 }],
      mode: cfg.pricing.type === 'subscription' ? 'subscription' : 'payment',
      successUrl: 'https://ayoola.me/agency/success.html',
      cancelUrl: 'https://ayoola.me/agency/'
    });
  });
}
*/


/*let CONFIG;
fetch('/config')
  .then(r=>r.json())
  .then(c=>{CONFIG=c;init();});

function init(){
  document.getElementById('hero-h1').textContent=CONFIG.hero.h1;
  document.getElementById('hero-h2').textContent=CONFIG.hero.h2;
  const stripe=Stripe(CONFIG.stripe.mode==='live'?CONFIG.stripe.pk_live:CONFIG.stripe.pk_test);
  const btn=document.getElementById('checkout-btn');
  btn.textContent=CONFIG.pricing.type==='subscription'?`Join the Waitlist – $${CONFIG.pricing.amount/100}/${CONFIG.pricing.interval}`:`Buy Now – $${CONFIG.pricing.amount/100}`;
  btn.addEventListener('click',()=>{
    stripe.redirectToCheckout({
      mode:CONFIG.pricing.type==='subscription'?'subscription':'payment',
      line_items:[{
        price_data:{
          currency:CONFIG.pricing.currency,
          product_data:{name:'Excellence Games Pre-launch Pass'},
          unit_amount:CONFIG.pricing.amount,
          ...(CONFIG.pricing.type==='subscription'&&{recurring:{interval:CONFIG.pricing.interval}})
        },
        quantity:1
      }],
      success_url:window.location.origin+'/success.html',
      cancel_url:window.location.origin
    });
  });
}*/

