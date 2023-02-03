import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const spanStyle = {
  padding: '20px',
  background: '#efefef',
  color: '#000000'
}

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '600px'
}
const slideImages = [
  {
    url: 'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/97773D3AD23DD9942EE4EDDB26E775D192E7AC6B038E459A6CF91D0107BB33AF/scale?width=1200&aspectRatio=1.78&format=jpeg',
    
  },
  {
    url: 'https://lumiere-a.akamaihd.net/v1/images/richbanner-toystory4_0026da28.jpeg?region=0,0,1920,1045',
  
  },
  {
    url: 'https://helios-i.mashable.com/imagery/articles/04cC8PVsNSfDFsMvpswspUm/hero-image.fill.size_1248x702.v1623364413.jpg',
    
  },
  {
    url: 'https://t2.tudocdn.net/363671?w=1920',
  }
];

const Slideshow = () => {
    return (
      <div className="slide-container">
        <Slide>
         {slideImages.map((slideImage, index)=> (
            <div key={index}>
              <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                {/* <span style={spanStyle}>{slideImage.caption}</span> */}
              </div>
            </div>
          ))} 
        </Slide>
      </div>
    )
}

export default Slideshow