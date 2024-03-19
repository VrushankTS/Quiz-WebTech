import React from "react";
import $ from 'jquery';

class Dialog extends React.Component {
    
    constructor(props) {
        super(props);
        this.modelRef = React.createRef();
    }

    componentDidMount() {
        $(this.modelRef.current).hide();
    }
    
    hideScreen() {
        $(this.modelRef.current).fadeIn(200);
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    }

    showScreen() {
        $(this.modelRef.current).fadeOut(200);
        document.getElementsByTagName('html')[0].style.overflow = 'auto';
    }

    render() {

        let theChild = undefined;
        if(this.props.model === true) {
            this.hideScreen();
        } else {
            this.showScreen();
        }
        if(this.props.model) {
            theChild = <div ref={this.modelRef} style={{overflow:'scroll', position:'absolute', top:'0', bottom:'0', left:'0', right:'0', zIndex: this.props.zIndex ? this.props.zIndex: 20, width: '100vw', backgroundColor: this.props.backgroundColor ? this.props.backgroundColor: 'rgba(0,0,0,0.5)', display:"flex", alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{backgroundColor: this.props.noBg ? '' : 'white', borderRadius: '20px', padding: '20px'}}>
                        {this.props.children}
                    </div>
                </div>
        }
        return (
            <div>
                {theChild}
            </div>
        );
    }
}

export default Dialog;
