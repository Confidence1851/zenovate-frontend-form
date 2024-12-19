

interface PriceSelectionModalProps {
  product: Product;
  onSelect: (option: ProductPrice) => void;
  isOpen: boolean;
  onClose: () => void;
}

const FormProductPriceSelectionModal = ({ product, onSelect, isOpen, onClose }: PriceSelectionModalProps) => {

  return <>
    {isOpen ? (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-20" onClick={onClose}></div>

        {/* Modal Content */}
        <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <h2 className="text-lg font-bold mb-4">Select Plan</h2>
          <p className="text-sm text-gray-500 mb-6">
            Choose the best plan for your business needs
          </p>

          {product.price.map((price) => (
            <div
              key={price.id}
              className="flex justify-between items-center border p-4 mb-2 rounded cursor-pointer hover:bg-gray-100"
              onClick={() => {
                onSelect(price);
                onClose();
              }}
            >
              <div>
                <h3 className="font-semibold">Title</h3>
                <p className="text-sm text-gray-500">Subtitle</p>
              </div>
              <span className="text-sm font-medium">{price.currency}{price.value} / {price.unit.toUpperCase()}</span>
            </div>
          ))}

          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
      </div>
    ) : null}
  </>
};

export default FormProductPriceSelectionModal;
