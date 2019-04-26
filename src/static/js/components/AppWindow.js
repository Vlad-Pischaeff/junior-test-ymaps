import React from 'react';
import { YMaps, Map, ZoomControl } from 'react-yandex-maps';
import RoutePath from './RoutePath';

const mapState = { center: [55.16, 61.39], zoom: 10,  };

class AppWindow extends React.Component {

    state = {
        width: 800,
        height: 600,
    }

    geocode = (ymaps) => {
        this.props._geocode(ymaps);
        this.props._mapInstance(this.mapInstance);
    }


    render () {
        const { width, height } = this.state;
        console.log('AppWindow render called', this.props._coords);

        return (

            <YMaps query={{ lang: 'ru_RU' , apikey: 'ee5684c5-2dac-4a30-b36e-2e563e23d107' }} >
                <Map id='map' width={width} height={height} state={mapState}
                     onLoad={(ymaps) => this.geocode(ymaps)}
                     instanceRef={(map) => this.mapInstance = map} modules={['geocode']} >
                    <ZoomControl options={{ size: 'small', zoomDuration: 1000, }} />

                    <RoutePath __coords={this.props._coords}
                               __points={this.props._points}
                               __changeCoords={this.props._changeCoords} />

                </Map>
            </YMaps>

        );
    }
}

export default AppWindow;
