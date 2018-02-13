import { Dimensions } from 'react-native'
import Button from './global-components/button'
import Label from './global-components/label'
import Toast from './global-components/toast'
import Alert from './global-components/alert'
import AnimateNext from './global-components/animate-next'
import Header from './global-components/header'
import YellowCounter from './global-components/yellow-counter'
import GetMarkerByType from './global-components/get-marker-by-type'
import ThemeNumericInput from './global-components/theme-numeric-input'
import ThemeDropdown from './global-components/theme-dropdown'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from './resources/selection.json';

const Icon = createIconSetFromIcoMoon(icoMoonConfig);

const LocalNumber = (number) => !number ? 0 : ((+(number || 0).toFixed(2)).toString()).replace(/\./g, ",")

const Price = (price) => (typeof price == "object" && price != null) ? `${LocalNumber(+price.price)}€/${price.priceType}` : `${LocalNumber(price)}€`

const Resize = (imageUrl, maxSize) => imageUrl ? `${imageUrl}?width=${(maxSize || 200)}&height=${(maxSize || 200)}` : 'https://i.imgur.com/SFRxsS3.png'

const deg2rad = (deg) => deg * (Math.PI / 180);

const GetDistanceFromCoords = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}

const { height: vh, width: vw } = Dimensions.get('window');

export {
    Resize,
    ThemeDropdown,
    LocalNumber,
    Price,
    ThemeNumericInput,
    GetMarkerByType,
    YellowCounter,
    Header,
    AnimateNext,
    Icon,
    GetDistanceFromCoords,
    Alert,
    Toast,
    Button,
    Label,
    vw,
    vh
}