import { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { DataTable } from 'react-native-paper'

export default function SourcesOfTrafficTableCard({ label, data }) {
  const [showDescription, setShowDescription] = useState(false)
  console.log(data)

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
            <DataTable.Title style={styles.header}>Domain</DataTable.Title>
            <DataTable.Title numeric style={styles.header}>Visits</DataTable.Title>
          </DataTable.Header>

          {data.map((item, index) => (
            item.name && ( // Only render rows where name is not null
              <DataTable.Row key={index}>
                <DataTable.Cell style={styles.cell}>
                  {item.name.replace(/^https?:\/\//, '').replace(/^www\./, '')}
                </DataTable.Cell>
                <DataTable.Cell numeric style={styles.cell}>{item.sessionsCount}</DataTable.Cell>
              </DataTable.Row>
            )
          ))}
        </DataTable>
      </View>

      {showDescription && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>Pages referring traffic to your site.</Text>
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
  header: {
    flex: 1, // Allow the header to expand fully
  },
  cell: {
    flex: 1, // Allow the cell to take up all available space
    flexWrap: 'wrap', // Allow text to wrap to the next line if it's too long
  },
})
