export const common = {
    /* positions */
    positionsDataLabel: { fontFamily: 'HelveticaNeue', fontSize: 12, color: '#01aca8' },
    positionsData: { fontFamily: 'HelveticaNeue-Thin', fontSize: 14 },
    positionsYearStyle: { marginTop: 10, marginBottom: 10, marginLeft: 10, width: 100, justifyContent: 'center' },
    positionsMoreLink: { fontFamily: 'HelveticaNeue', fontSize: 12, color: '#279988' },  
  
    /* common button styles */
    //touchable opacity (button) with text inside
    touchButton: { alignItems: 'center', alignSelf: 'center', justifyContent: 'center', borderRadius: 4, paddingTop: 10, paddingBottom: 10, minWidth: 160 },
    touchButtonEnabled: { backgroundColor: '#279988' },
    touchButtonDisabled: { backgroundColor: '#27998865' },
    touchButtonText: { fontFamily: 'HelveticaNeue-Light', color: '#fff', fontSize: 18 },
    touchButtonTextEnabled: { color: '#fff' },
    touchButtonTextDisabled: { color: '#ffffff65' },
    touchButtonCancel: { backgroundColor: '#fff', alignItems: 'center', alignSelf: 'center', justifyContent: 'center', borderRadius: 4, paddingTop: 10, paddingBottom: 10, minWidth: 160 },
    touchButtonCancelText: { fontFamily: 'HelveticaNeue-Light', color: '#9fa9ba', fontSize: 18 },
    
    /* radio buttons */
    radioButtonContainer: { height: 32, width: 32, borderRadius: 16, borderWidth: 2, borderColor: '#fff', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
    radioButtonSelected: { height: 20, width: 20, borderRadius: 10, backgroundColor: '#279989' },
    radioButtonText: { color: '#ffffff', fontSize: 16, marginLeft: 5 },
    radioButtonContainerDisabled: { height: 32, width: 32, borderRadius: 16, borderWidth: 2, borderColor: '#9ea6b1', backgroundColor: '#ffffff80', alignItems: 'center', justifyContent: 'center' },
    radioButtonSelectedDisabled: { height: 20, width: 20, borderRadius: 10, backgroundColor: '#376768' },
    radioButtonTextDisabled: { color: '#ffffff60', fontSize: 16, marginLeft: 5 },

    /* popup stuff */
    popupContainer: { zIndex: 1000, position: 'absolute', borderColor: '#bed8dd', borderWidth: 1, borderTopWidth: 0, shadowColor: '#aaa', shadowOffset: { width: 2, height: 2 }, shadowRadius: 5, shadowOpacity: 0.8 },
    popupTitleContainer: { borderTopColor: '#e7b514', borderTopWidth: 4, backgroundColor: '#3d4c57', padding: 20 },
    popupTitleText: { color: '#fff', fontFamily: 'HelveticaNeue-Thin', fontSize: 24, textAlign: 'center' },
};
