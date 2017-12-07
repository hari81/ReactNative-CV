import React, { Component } from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ImageButton } from '../common';
import imgBenefits110 from '../common/img/benefits-110.png';

const { height, width } = Dimensions.get('window');
class ProductBenefitsList extends Component {
    nextScreens(id) {
        switch (id) {
            case 1:
                Actions.whatToday();
                break;
            case 2:
                const Crop = this.props.cropButton.cropButtons.filter(item => item.id === this.props.cropButton.selectedId);
                Actions.selectContractMonth({ cropcode: Crop[0].code, cropyear: Crop[0].cropYear });
                break;
            default:
        }
    }
    render() {
        const tHeaderText = `Benefits of ${this.props.riskProductName}`;
        let tBodyText = null;
        let tFooterText = null;
        let tImgBenefits = null;

        switch (this.props.riskProductId) {
            case 107:
                tBodyText = 'Fix the future\'s component while maintaining flexibility in setting your basis and delivery. Sell today or use a limit order to put your marketing plan into action. Swaps can be used to fix a price and collect cash if the commodity contract settles below the swap level on the calculation date. When using a swap you have the ability to re-price any time prior to expiration, with a low known cost, and defer the fee collection until swap settlement. You remain in control all season long.';
                tFooterText = '*Swaps normally exchanged as cash between counterparties';
                tImgBenefits = null;
                break;
            case 110:
                tBodyText = 'The Floored Daily Bonus provides the security of a floor with the opportunity to earn a daily bonus during the pricing period – simply select your floor price and bonus price. Each day the commodity contract settles above the floor price, the contract prices at the bonus price. If the market settles below the floor price you benefit from the floor. If on the calculation date the commodity contract settles above the bonus price you price an additional quantity at the bonus price (in addition to the original quantity). This additional quantity is also known as the Contingent Offer quantity. The Floored Daily Bonus is typically offered at zero cost with the ability to work orders at customized levels.';
                tFooterText = 'On contract calculation date or when unwinding the position remember to place an offsetting physical position and update my farm details to maintain accurate My Farm insights, as applicable.';
                tImgBenefits = imgBenefits110;
                break;
            case 5:
                tBodyText = 'A Custom Put Option gains value as the underlying commodity contract declines. This is an effective hedging tool for an un-priced producer to hedge against declining prices. You collect cash if the underlying commodity contract settles below the floor level on the calculation date, with the ability to re-price any time prior to expiration. Risk is limited to the cost or premium of the option. Custom Put Options have a low known cost and the ability to defer the premium to settlement.';
                tFooterText = '*Swaps normally exchanged as cash between counterparties';
                tImgBenefits = null;
                break;
            default:
                break;
        }
        return (
            <View style={styles.container}>
                <View style={styles.subViewStyle}>
                    <Text style={styles.subTextStyle}>{tHeaderText}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 10, width: 940 }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.bodyText}>{tBodyText}</Text>
                        </View>
                        <Image style={styles.productImage} source={tImgBenefits} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 38, marginLeft: 30, width: 943 }}>
                    <Text style={styles.footerText}>{tFooterText}</Text>
                    <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}>
                        <ImageButton text='BACK' onPress={this.nextScreens.bind(this, 1)} />
                        <ImageButton text='NEXT' onPress={this.nextScreens.bind(this, 2)} />
                    </View>
                </View>

            </View>
        );
    }
}
const styles = {
    container: { height: height * 0.593, width: width * 0.968, backgroundColor: '#3d4c57', marginHorizontal: width * 0.0156, marginTop: height * 0.0494, marginBottom: height * 0.0091, borderColor: '#bed8dd', borderWidth: 1, borderTopWidth: 4, borderTopColor: 'rgb(231,181,20)' },
    subViewStyle: { marginLeft: 30, marginTop: height * 0.031 },
    subTextStyle: { fontSize: 32, fontFamily: 'HelveticaNeue-Thin', color: 'rgb(255,255,255)' },
    bodyText: { marginRight: 40, width: 434, color: '#fff', fontFamily: 'HelveticaNeue-Light', fontSize: 16 },
    footerText: { fontFamily: 'HelveticaNeue-Light', color: '#fff', width: 520, alignSelf: 'center', fontSize: 14, fontStyle: 'italic' },
    productImage: { marginTop: 1, borderWidth: 1, borderColor: '#bed8dd', alignItems: 'flex-end', width: 465, height: 242 },
};

const mapStateToProps = state => {
    return {
        cropButton: state.cropsButtons,
    };
};

export default connect(mapStateToProps, null)(ProductBenefitsList);
