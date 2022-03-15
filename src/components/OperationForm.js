import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  saveOperation,
  getOperation,
  updateOperation,
  getTokens,
} from "../firebase/api";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  token: "BTC",
  purchaseValue: 0,
  amount: 0,
};
export const OperationForm = () => {
  const [operation, setOperation] = useState(initialState);
  const [tokens, setTokens] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const handleInputChange = ({ target: { name, value } }) =>
    setOperation({ ...operation, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!params.id) {
      await saveOperation(operation);
      toast("New Link Added", {
        type: "success",
      });
    } else {
      await updateOperation(params.id, operation);
      toast("Updated", {
        type: "success",
      });
    }

    // Clean Form
    setOperation(initialState);
    navigate("/");
  };

  const getLinkById = async (id) => {
    try {
      const doc = await getOperation(id);
      setOperation({ ...doc.data() });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (params.id) {
      getLinkById(params.id);
    }
  }, [params.id]);

  useEffect(() => {
    setOperation({
      ...operation,
      purchaseValue: tokens.find((token) => token.id == operation.token)?.price,
    });
  }, [operation.amount]);

  useEffect(() => {
    getTokens().then((data) =>
      setTokens(
        data.map((token) => {
          return { id: token.id, price: token.price, key: token.id };
        })
      )
    );
  }, []);

  return (
    <div className="col-md-4 offset-md-4">
      <form onSubmit={handleSubmit} className="card card-body bg-secondary">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="token">
              Token
            </label>
          </div>
          <div style={{ border: "2px solid #222222", borderRadius: "9px" }}>
            <select
              className="btn btn-secondary dropdown-toggle"
              id="token"
              name="token"
              value={operation.token}
              onChange={handleInputChange}
            >
              {tokens.map((token) => (
                <option value={token.id}>{token.id}</option>
              ))}
            </select>
          </div>
        </div>
        Precio del token:{" "}
        {tokens.find((token) => token.id == operation.token)?.price} USD
        <br></br>
        Valor de la compra:{" "}
        {tokens.find((token) => token.id == operation.token)?.price *
          operation.amount}{" "}
        USD
        <div className="input-group mb-3">
          <div className="input-group-text bg-dark">Cantidad</div>
          <input
            type="decimal"
            className="form-control"
            placeholder="10"
            value={operation.amount}
            name="amount"
            onChange={handleInputChange}
          />
        </div>
        <button
          className="btn btn-primary btn-block"
          disabled={false /*!website.url || !website.name*/}
        >
          {!params.id ? "Save" : "Update"}
        </button>
      </form>
    </div>
  );
};
