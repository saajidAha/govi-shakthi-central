import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Platform,
    Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function ProfilePage() {
    const router = useRouter();

    const menuItems = [
        {
            title: 'Personal Details',
            lastUpdated: '2 days ago',
            onPress: () => router.push('/settings/edit-profile')
        },
        {
            title: 'Statistics',
            lastUpdated: '5 days ago',
            onPress: () => Alert.alert('Statistics', 'This feature is not available yet.')
        },
        {
            title: 'Produced Products',
            lastUpdated: 'This Year',
            onPress: () => Alert.alert('Products', 'This feature is not available yet.')
        },
        {
            title: 'History',
            lastUpdated: '3 days ago',
            onPress: () => Alert.alert('History', 'This feature is not available yet.')
        },
        {
            title: 'Predictions',
            lastUpdated: '3 days ago',
            onPress: () => Alert.alert('Predictions', 'This feature is not available yet.')
        },
        {
            title: 'Subscription Plan',
            lastUpdated: 'Updated today',
            onPress: () => router.push('/subsciption/subscriptionPlan')
        },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.greenHeader}>
                    <View style={styles.topNav}>
                        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                            <Image source={require('../../assets/images/back.png')} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.settingsButton} onPress={() => router.push('/settings/settings')}>
                            <Image source={require('../../assets/images/settings.png')} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.profileInfo}>
                        <Image source={require('../../assets/images/Profile Pic.jpg')} style={styles.profileImage} />
                        <Text style={styles.profileName}>Profile</Text>
                        <Text style={styles.userName}>Dudley Sirisena</Text>
                        <Text style={styles.location}>Anuradhapura, Sri Lanka</Text>
                    </View>
                </View>

                <View style={styles.subscriptionContainer}>
                    <View style={styles.subscriptionCard}>
                        <View style={styles.subscriptionHeader}>
                            <Text style={styles.subscriptionTitle}>Subscription Plan</Text>
                        </View>

                        <View style={styles.subscriptionButtonsRow}>
                            <TouchableOpacity
                                style={styles.viewDetailsButton}
                                onPress={() => router.push('/subsciption/subscriptionPlan')}>
                                <Text style={styles.viewDetailsText}>View Details</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.resourcesContainer}>
                    <View style={styles.resourcesRow}>
                        <TouchableOpacity
                            style={styles.resourceCard}
                            onPress={() => router.push('/settings/weather')}>
                            <Text style={styles.resourceTitle}>Weather</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.resourceCard}
                            onPress={() => router.push('/settings/news')}>
                            <Text style={styles.resourceTitle}>News</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.resourceCard}
                            onPress={() => router.push('/settings/chatbot')}>
                            <Text style={styles.resourceTitle}>Chatbot</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.menuContainer}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
                            <View style={styles.menuItemLeft}>
                                <Text style={styles.menuItemTitle}>{item.title}</Text>
                                <Text style={styles.menuItemSubtitle}>{item.lastUpdated}</Text>
                            </View>
                            <Image source={require('../../assets/images/chevronright.png')} style={styles.chevronIcon} />
                            {index < menuItems.length - 1 && <View style={styles.divider} />}
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? 25 : 0,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    greenHeader: {
        backgroundColor: '#00A67E',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        marginBottom: 16,
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
        fontSize: 30,
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
    icon: {
        width: 24,
        height: 24,
        tintColor: '#fff',
    },
    chevronIcon: {
        width: 24,
        height: 24,
        tintColor: '#333',
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
    subscriptionContainer: {
        paddingHorizontal: 20,
        marginTop: 5,
        marginBottom: 10,
    },
    subscriptionCard: {
        backgroundColor: '#ecf0e9',
        borderRadius: 15,
        padding: 15,
    },
    subscriptionHeader: {
        marginBottom: 10,
    },
    subscriptionButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    viewDetailsButton: {
        borderWidth: 1,
        borderColor: '#00A67E',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#ecf0e9',
    },
    viewDetailsText: {
        color: '#00A67E',
        fontWeight: 'bold',
        fontSize: 14,
    },
    subscriptionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    }
});
