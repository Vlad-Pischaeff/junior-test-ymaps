import React, { Component } from 'react';
import AppWindow from './AppWindow';
import LeftMenu from './LeftMenu';

class App extends Component {
    state = {
        gmap: null,
        coords: [],
        points: [],
        properties: [{ hintContent: '1', balloonContent: '2'}],
        mapref: null,
    };

    addAddr = (e, i, p1, p2 , p3) => {
        //console.log("args--", e, i, p1, p2 , p3);
        var mass = this.state.points;
        var coor = this.state.coords;
        var obj = {};
        obj['city'] = p1;
        obj['street'] = p2;
        obj['building'] = p3;
        (e === false) ? mass.push(obj) : mass[i] = obj;
        this.setState({ points: mass });
        //get coordinates
        var map = this.state.gmap;
        var str = p1 + ' ' + p2 + ' ' + p3;
        //console.log("str--", str);
        map.geocode(str)
            .then(result => {
                    var res = result.geoObjects.get(0).geometry.getCoordinates();
                    //console.log("result1--", res, e);
                    (e === false) ? coor.push(res) : coor[i] = res;
                    this.setState({ coords: coor });
                }
            );
    }

    removeItem = (i) => {
        var mass1 = this.state.points;
        var mass2 = this.state.coords;
        mass1.splice(i, 1);
        mass2.splice(i, 1);
        this.setState({ points: mass1 });
        this.setState({ coords: mass2 });
    }

    changeCoords = (point, i) => {
        let map = this.state.gmap;
        let pnt = this.state.points.slice();;
        let obj = {};
        let crd = this.state.coords.slice();
        crd[i] = point;
        this.setState({ coords: crd });
        map.geocode(point, {
            kind: 'house',
            results: 5
        }).then(result => {
                let firstGeoObject = result.geoObjects.get(0);
                let addr = firstGeoObject.getAddressLine();
                let elem = addr.split(',');
                let len = elem.length - 1;
                obj['building'] = elem[len];
                obj['street'] = elem[len -1];
                obj['city'] = elem[len -2];
                pnt[i] = obj;
                this.setState({ points: pnt });
            }
        );
    }

    __geocode = (ymaps) => {
        this.setState({ gmap: ymaps });
    }

    __mapInstance = (mapInstance) => {
        this.setState({ mapref: mapInstance});
    }

    __onSortEnd = (arr1, arr2) => {
        this.setState({ points: arr1 });
        this.setState({ coords: arr2 });
    }

    render() {

        return (

            <table style={{width:"100%", height:"100%"}} >
                <tbody>
                <tr>
                    <td style={{width:"20%", height:"100%"}} >
                        <LeftMenu  _coords={this.state.coords}
                                   _points={this.state.points}
                                   _addAddr={this.addAddr} _removeItem={this.removeItem}
                                   _onSortEnd={this.__onSortEnd}
                                   _updateLeftMenu={this.state.updateLeftMenu} />
                    </td>
                    <td style={{width:"80%", height:"100%"}} >
                        <AppWindow _coords={this.state.coords}
                                   _points={this.state.points}
                                   _geocode={this.__geocode}
                                   _mapInstance={this.__mapInstance}
                                   _changeCoords={this.changeCoords} />
                    </td>
                </tr>

                </tbody>
            </table>

        );
    }
}

export default App;
