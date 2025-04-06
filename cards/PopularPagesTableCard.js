import { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { DataTable } from 'react-native-paper'

export default function PopularPagesTableCard({ label, data }) {
  const [showDescription, setShowDescription] = useState(false)

  // Function to extract the path from the URL
  const getPath = (url) => {
    try {
      const { pathname } = new URL(url);
      return pathname;
    } catch (error) {
      return url; // Fallback to original URL in case of error
    }
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <Pressable
          style={styles.infoButton}
          onPress={() => setShowDescription(!showDescription)}
        >
          <Text style={styles.infoText}>?</Text>
        </Pressable>

        <Text style={styles.label}>{label}</Text>

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>URL</DataTable.Title>
            <DataTable.Title>Visits</DataTable.Title>
          </DataTable.Header>

          {data.map((item, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{getPath(item.url)}</DataTable.Cell>
              <DataTable.Cell>{item.visitsCount}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>

      {showDescription && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>Paths of popular destinations on your website</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    paddingTop: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  infoButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#e5e7eb',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 16,
  },
  toast: {
    backgroundColor: '#f3f4f6',
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'center',
    maxWidth: '90%',
  },
  toastText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
})
