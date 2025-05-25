export default function ReturnsPage() {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Возврат товара</h1>
        <p className="mb-4">
          Вы можете вернуть товар в течение 14 дней с момента получения, если он не подошёл по размеру или имеет производственный брак.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">Условия возврата:</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Товар должен быть в оригинальной упаковке</li>
          <li>Сохранены ярлыки и бирки</li>
          <li>Товар не был в использовании</li>
        </ul>
        <p>
          Для оформления возврата напишите нам на <a href="mailto:annbrand@mail.com" className="text-blue-600 underline">annbrand@mail.com</a> с темой "Возврат товара".
        </p>
      </main>
    );
  }
  