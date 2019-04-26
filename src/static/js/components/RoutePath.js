import React from 'react';
import { Placemark, Polyline } from 'react-yandex-maps';
import myIcon from '../img/myIcon2.svg';

const placemark = { modules: ['geoObject.addon.hint', 'geoObject.addon.balloon'],
                    options: {  iconLayout: 'default#image',
                                iconImageHref: myIcon,
                                iconImageSize: [20, 20],
                                iconImageOffset: [-10, -10],
                                draggable: true,
                                openBalloonOnClick: true,
                                openEmptyBalloon:true,
                                hideIconOnBalloonOpen:false,}
};

class RoutePath extends React.Component {

    handleDragend = (e, i) => {
        var obj = e.originalEvent.target.geometry._coordinates;
        this.props.__changeCoords(obj, i);
    };

    render() {
        const {__coords, __points} = this.props;
        const coordinates = __coords.map(n => n);

        const listPlacemarks = __coords.map((item, i) => {
                                        return (
                                            <Placemark {...placemark} key={`placemark-${i}`} geometry={item}
                                                        onDragend={(e)=>this.handleDragend(e, i)}
                                                        properties={{
                                                            balloonContent : `${__points[i]['city']} ,${__points[i]['street']} ,${__points[i]['building']}`,
                                                        }} />
                                        )
        });

        return (
            <div>
                <Polyline geometry={coordinates} options={{ balloonCloseButton: false,
                                                            strokeColor: '#000',
                                                            strokeWidth: 4,
                                                            strokeOpacity: 0.5, }} />
                {listPlacemarks}
            </div>
        );
    }
}

export default RoutePath;
