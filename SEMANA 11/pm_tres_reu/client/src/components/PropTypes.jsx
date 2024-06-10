import PropTypes from 'prop-types';

// Defino las PropTypes para los componentes de productos
export const ProductPropTypes = {
  title: PropTypes.string,
  price: PropTypes.number,
  description: PropTypes.string,
  _id: PropTypes.string
};

export const ProductFormPropTypes = {
  addProduct: PropTypes.func.isRequired,
  product: PropTypes.shape(ProductPropTypes),
  editMode: PropTypes.bool
};

export const ProductListPropTypes = {
  products: PropTypes.arrayOf(PropTypes.shape(ProductPropTypes)).isRequired,
  removeProduct: PropTypes.func.isRequired
};
