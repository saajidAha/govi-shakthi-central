import React from 'react';
import{
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Platform,
} from 'react-native';

export default function ProfilePage() {
    const menuItems = [
        {title: 'Personal Details', latUpdated: '2 days ago'},
        {title: 'Statics', latUpdated: '5 days ago'},
        {title: 'Produced Products', latUpdated: 'This Year'},
        {title: 'History', lastUpdated: '3 days ago'},
        {title: 'Predictions', latUpdated: '3 days ago'},
    ];

    return(
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

                <View style={styles.greenHeader}>
                    <View style={styles.topNav}>
                        <TouchableOpacity style={styles.backButton}>
                            <Image source={require('../../assets/images/back.png')} style={styles.icon}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.settingsButton}>
                            <Image source={require('../../assets/images/settings.png')} style={styles.icon}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.profileInfo}>
                        <Image source={require('../../assets/images/profileicon.png')} style={styles.profileImage}/>
                        <Text style={styles.profileName}>Profile</Text>
                        <Text style={styles.userName}>Dudley Sirisena</Text>
                        <Text style={styles.location}>Anuradhapura, Sri Lanka</Text>
                    </View>
                </View>

                <View style={styles.resourcesContainer}>
                    <View style={styles.resourcesRow}>
                        <TouchableOpacity style={styles.resourceCard}>
                            <Text style={styles.resourceTitle}>Available Resources</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.resourceCard}>
                            <Text style={styles.resourceTitle}>Available Resources</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.resourceCard}>
                            <Text style={styles.resourceTitle}>Available Resources</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.menuContainer}>
                    {menuItems.map((item, index)=> (
                        <TouchableOpacity key={index} style={styles.menuItem}>
                            <View style={styles.menuItemLeft}>
                                <Text style={styles.menuItemTitle}>{item.title}</Text>
                                <Text style={styles.menuItemSubtitle}>{item.lastUpdated}</Text>
                            </View>
                            <Image source={require('../../assets/images/chevronright.png')} style={styles.icon}/>
                            {index<menuItems.length-1 && <View style={styles.divider}/>}
                        </TouchableOpacity>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView> 
    );
}

const styles = StyleSheet.create({
    safeArea:{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? 25 : 0,
    },

    container:{
        flex: 1,
        backgroundColor: '#fff',
    },

    greenHeader: {
        backgroundColor: '#00A67E',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingBottom: 30,
    },
      
    topNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
      
    backButton: {
        padding: 5,
    },
    
    settingsButton: {
        padding: 5,
    },
    
    profileInfo: {
        alignItems: 'center',
        paddingVertical: 20,
    },
      
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#fff',
        marginBottom: 15,
    },
      
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
      
    userName: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '500',
    },
      
    location: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.8,
    },
      
    resourcesContainer: {
        paddingHorizontal: 20,
        paddingTop: 30,
    },
      
    resourcesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
      
    resourceCard: {
        width: '30%',
        height: 80,
        borderRadius: 15,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
      
    resourceTitle: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
      
    menuContainer: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
      
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        position: 'relative',
    },
      
    menuItemLeft: {
        flex: 1,
    },
      
    menuItemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
      
    menuItemSubtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
      
    divider: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: '#E0E0E0',
    },

    icon:{
        width: 24,
        height: 24,
        tintColor: '#fff',
    }
});

