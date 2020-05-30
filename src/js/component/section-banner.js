class SectionBanner extends HTMLElement{
    constructor(){
        super();
        this._shadowDOM = this.attachShadow({mode:"open"});
    }

    connectedCallback(){
        this.render();
    }

    render(){
        this._shadowDOM.innerHTML = `
        <style>
          :host{
            margin-bottom : 250px;
          }
          
          .section-banner__content-wrapper{
            background-color: rgba(0,0,0,.03);
            width: 100%;
            display: block;
            position: relative;
            font-size: 1em;
          }

          .section-banner__text{
            position: absolute;
            left: 10px;
          }
          
          .section-banner__text-title{
            font-size: 1.5em;
            font-weight: 600;
          }
        </style>
        <div class="section-banner">
        <div class="container section-banner__content-wrapper">
          <div class="section-banner__text">
            <p class="section-banner__text-title">🍲Food Order🍲</p>
            <p>Steps you need to follow: </p>
            <p>1. Chose menu category</p>
            <p>2. Add your favourite menu</p>
            <p>3. Calculate 💸 you need to paid on basket</p>
          </div>
        </div>
      </div>
        `;
    }

     
}
customElements.define('section-banner',SectionBanner);
