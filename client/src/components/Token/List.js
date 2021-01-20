import React, {useState, useEffect, Component} from "react";

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : null,
            total_supply : null,
            address : null,
            _to: '',
            tokens: 0,
            nbHolder : null
        }
    }

    componentDidMount = async () => {
        try {
            const name_ = await this.props.callContract.contract.methods.getName().call();
             this.setState({
                name: name_
            })
            console.log(this.state.name)

            const total_supply_ = await this.props.callContract.contract.methods.getTotalSupply().call();
            this.setState({
                total_supply: total_supply_
            })
            console.log(this.state.total_supply)

            this.setState({
                address: this.props.callContract.contract._address
            })
            console.log(this.props.callContract.contract._address)


            const nbHolder_ = await this.props.callContract.contract.methods.getNbHolder().call();
            this.setState({
                nbHolder: nbHolder_
            })
            console.log(this.state.nbHolder);
        } catch (error) {
            alert(
                `Failed componentDidMount dans List.js`,
            );
            console.error(error);
        }
    }

    newTreatment = async e => {
        const gas = await this.props.callContract.contract.methods.transfer(this.state._to, this.state.tokens).estimateGas();
        console.log(this.state._to);
        console.log(this.state.tokens);

        this.props.callContract.contract.methods.transfer(this.state._to, this.state.tokens)
            .send({ from: "0xC16f5e780434404265CAfEdfcCE2b4039321cE94", gas });
    }

    // Enregistre les valeurs du formulaire dans le state
    handleKeyUp = (event, field) => {
        const input = event.currentTarget;
        this.setState({
            [field]: input.value
        });
    };

    render() {
    return (
        <div className={'container'}>
            <h1>Details/Ajout d'un traitement : </h1>
            <br/>
            <div className="text-justify">
                <div className="form-group">
                    <input onKeyUp={(event) => this.handleKeyUp(event, "_to")} type="text" className="form-control"
                           placeholder="_to" />
                </div>
                <div className="form-group">
                    <input onKeyUp={(event) => this.handleKeyUp(event, "tokens")} type="text" className="form-control"
                           placeholder="tokens" />
                </div>
                <div className="text-center">
                    <button onClick={(event) => {
                        this.newTreatment(event);
                    }} type="button" className="btn btn-success">Lancer le transfer</button>
                </div>
            </div>

            <div className={"container text-center"}>
                <h2 className={"py-3"}>Détails du Token</h2>
                <br/>
            </div>
            <div>
                Name Token : {this.state.name}
            </div>
            <div>
                Total Supply Token : {this.state.total_supply}
            </div>
            <div>
                Adresse : {this.state.address}
            </div>
            <div>
                Nombre de holder : {this.state.nbHolder}
            </div>
            <div>
                Les 3 plus gros holder du token :
            </div>
        </div>

    );
  }
}
export default  List;
