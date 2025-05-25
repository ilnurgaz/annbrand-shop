export default function DeliveryAndPaymentPage() {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Доставка и оплата</h1>
        <p className="mb-4">
          Мы доставляем заказы по всей России и странам СНГ. Сроки и стоимость доставки зависят от региона и выбранного способа доставки.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">Способы доставки:</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Курьерская доставка</li>
          <li>Пункты выдачи заказов</li>
          <li>Почта России</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-2">Способы оплаты:</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Банковская карта (Visa, MasterCard, Мир)</li>
          <li>СБП</li>
          <li>Наложенный платёж</li>
        </ul>
        <p>Если у вас остались вопросы, напишите нам на <a href="mailto:annbrand@mail.com" className="text-blue-600 underline">annbrand@mail.com</a>.</p>
      </main>
    );
  }
  