import { useEffect, useState } from "react";
import { getOperations, getTokens } from "../firebase/api";
//import { WebsiteCard } from "./WebsiteCard";

export const OperationList = () => {
  const [operations, setOperations] = useState([]);
  const [tokens, setTokens] = useState([]);

  const getLinks = async () => {
    const querySnapshot = await getOperations();
    // onGetLinks((querySnapshot) => {
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    setOperations(docs);
    // });
  };

  console.log(tokens);

  useEffect(async () => {
    getLinks();
    getTokens().then((data) =>
      setTokens(
        data.map((token) => {
          return { id: token.id, price: token.price, key: token.id };
        })
      )
    );
  }, []);

  //getTokens().then((data) => console.log(data));

  return (
    <>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Token</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Valor de compra</th>
            <th scope="col">Valor actual</th>
            <th scope="col">Balance</th>
          </tr>
        </thead>
        <tbody>
          {operations.map((operation) => (
            <tr>
              <th scope="row">{operation.token}</th>
              <td>{operation.amount}</td>
              <td>{Math.round(operation.purchaseValue* 100) / 100}</td>
              <td>
                {Math.round(tokens.find((token) => token.id == operation.token)?.price* 100) / 100}
              </td>
              <td>
                {Math.round((tokens.find((token) => token.id == operation.token)?.price -
                  operation.purchaseValue)* 100) / 100}
              </td>
            </tr>
          ))}
          {/*<div className="col-md-4" key={link.id}>
              <WebsiteCard link={link} />
          </div>*/}
        </tbody>
      </table>
      * todos los valores en esta pagina son en USD
    </>
  );
};
