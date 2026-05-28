function ProductCard({
  product: { image, name, price, onSale, description },
  children,
}) {
  return (
    <div className="col-4">
      <div className="card rounded p-3 w-100 h-100" style={{ width: '18rem' }}>
        <img src={image} className="card-img-top product-img" alt={name} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title h2">{name}</h5>
          <p className=" mt-3 card-text flex-grow-1">{description}</p>

          <h6 className="h3 mb-3">{price}$</h6>

          <a href="#" className="btn btn-primary">
            Acquista
          </a>
          {onSale && (
            <span className=" mt-3 p-2 badge bg-danger w-75 center">
              In saldo!
            </span>
          )}

          {/* Area per contenuto personalizzato */}

          {children && (
            <div className="mt-3 pt-3 border-top border-primary">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
