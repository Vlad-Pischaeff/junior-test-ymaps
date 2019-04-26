import React from 'react';
import { Placemark, Polyline } from 'react-yandex-maps';
import myIcon from '../img/myIcon2.svg';

const placemark = { modules: ['geoObject.addon.hint'],
                    options: {  iconLayout: 'default#image',
                                iconImageHref: myIcon,
                                iconImageSize: [20, 20],
                                iconImageOffset: [-10, -10],
                                draggable: true, }
};

class RoutePath extends React.Component {
/*    state = {
        str: [],
    }

    componentWillReceiveProps(Props) {
        this.setState({ str: Props.__coords});
        //console.log("componentWillReceiveProps--", Props, this.state.str);
    }

    shouldComponentUpdate(nextProps, nextState) {
        const vitalPropsChange = this.props.__coords !== nextProps.__coords;
        console.log("nextProps--", this.props.__coords, nextProps.__coords, vitalPropsChange );
        return true;
    }*/

    handleDragend = (e, i) => {
        var obj = e.originalEvent.target.geometry._coordinates;
        this.props.__changeCoords(obj, i);
    };

    render() {
        const {__coords} = this.props;
        const coordinates = __coords.map(n => n)
        const listPlacemarks = __coords.map((item, i) => {
                                        return (
                                            <Placemark {...placemark} key={i} geometry={item}
                                                       onDragend={(e)=>this.handleDragend(e, i)} />
                                        )
        });

        //console.log('RoutePath render called0', __coords, this.state.str, coordinates);

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
