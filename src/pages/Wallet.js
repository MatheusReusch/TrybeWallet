import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { saveExpense, removeExpense, editExpense } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'CAD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      moedas: [],
      editId: 0,
    };
  }

  componentDidMount() {
    this.total = 0;
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ moedas: Object.keys(data) });
      });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  updateTotal = () => {
    this.total = 0;
    const { despesas } = this.props;
    despesas.map(
      (despesa) => {
        (this.total -= -(
          despesa.value * despesa.exchangeRates[despesa.currency].ask
        ));
        return null;
      },
    );
  };

  render() {
    const { id, value, description, currency, method, tag, moedas, editId } = this.state;
    const { saveDespesa, despesas, removerDespesa, editarDespesa, email } = this.props;
    this.updateTotal();
    return (
      <>
        <section>
          <h3 data-testid="email-field">{ email }</h3>
          <h2 data-testid="total-field">{this.total}</h2>
          <h2 data-testid="header-currency-field">BRL</h2>
          <input
            onChange={ this.handleChange }
            type="number"
            data-testid="value-input"
            name="value"
            value={ value }
          />
          <input
            onChange={ this.handleChange }
            type="text"
            data-testid="description-input"
            name="description"
            value={ description }
          />
          <label htmlFor="moeda">
            Moeda
            <select
              id="moeda"
              onChange={ this.handleChange }
              data-testid="currency-input"
              name="currency"
              value={ currency }
            >
              {moedas.map(
                (moeda) => moeda !== 'USDT' && (
                  <option data-testid={ moeda }>{moeda}</option>
                ),
              )}
            </select>
          </label>
          <select
            onChange={ this.handleChange }
            data-testid="method-input"
            name="method"
            value={ method }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select
            onChange={ this.handleChange }
            data-testid="tag-input"
            name="tag"
            value={ tag }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          <button
            type="button"
            onClick={ async () => {
              await saveDespesa({
                id,
                value,
                description,
                currency,
                method,
                tag,
              });
              this.setState((prevState) => ({
                id: prevState.id + 1,
                value: '',
              }));
            } }
          >
            Adicionar despesa
          </button>
          <button
            type="button"
            onClick={ () => {
              console.log(currency);
              editarDespesa(editId, {
                id,
                value,
                description,
                currency,
                method,
                tag,
              });
            } }
          >
            Editar despesa
          </button>
        </section>
        <table>
          <thead>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </thead>
          <tbody>
            {despesas.map((despesa) => (
              <tr key={ Math.random() }>
                <td>{despesa.description}</td>
                <td>{despesa.tag}</td>
                <td>{despesa.method}</td>
                <td>{despesa.value}</td>
                <td>
                  {despesa.exchangeRates[despesa.currency].name.split('/')[0]}
                </td>
                <td>
                  {Number(despesa.exchangeRates[despesa.currency].ask).toFixed(
                    2,
                  )}
                </td>
                <td>
                  {despesa.value * despesa.exchangeRates[despesa.currency].ask}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    onClick={ () => this.setState({ editId: despesa.id }) }
                    data-testid="edit-btn"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={ () => removerDespesa(despesa.id) }
                    data-testid="delete-btn"
                  >
                    Remover despesa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <section />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  despesas: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveDespesa: (objeto) => dispatch(saveExpense(objeto)),
  removerDespesa: (id) => dispatch(removeExpense(id)),
  editarDespesa: (id, objeto) => dispatch(editExpense(id, objeto)),
});

Wallet.propTypes = {
  despesas: propTypes.func.isRequired,
  saveDespesa: propTypes.func.isRequired,
  removerDespesa: propTypes.func.isRequired,
  editarDespesa: propTypes.func.isRequired,
  email: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
