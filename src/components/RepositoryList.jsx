import {
  FlatList,
  View,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  TextInput
} from 'react-native';
import { useNavigate } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import useRepositories from '../hooks/useRepositories';
import { useDebounce } from 'use-debounce';
import React, { useState } from 'react';
import SortPicker from './SortPicker';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  searchInput: {
    width: '80%',
    padding: 15,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingRight: 10,
    marginHorizontal: 15,
    marginBottom: 10,
    backgroundColor: 'white',
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {

  renderHeader = () => {

    const { search, setSearch, order, setOrder } = this.props;
    return (
      <View style={{ padding: 15 }}>
          <View>
            <View style={styles.filterContainer}>
              <TextInput 
                value={search} 
                onChangeText={setSearch} 
                placeholder="Search repositories..." 
                style={styles.searchInput}
              />
              <Pressable onPress={() => setSearch('')}>
                <Text color="textPrimary" fontWeight="bold" style={{ fontSize: 20}}>×</Text>
              </Pressable>
            </View>
            <SortPicker order={order} setOrder={setOrder} />
          </View>
        </View>
    )
  }
  
  render() {
    const {
      repositories,
      onRepositoryPress,
      onEndReach,
    } = this.props;

    const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

    return (
      <FlatList
        data={repositoryNodes}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onRepositoryPress && onRepositoryPress(item)}
          >
            <RepositoryItem item={item} />
          </Pressable>
        )}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.75}
      />
    );
  };
}

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState('Latest');
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  
  const { repositories, fetchMore, loading, error } = useRepositories({
    orderBy: selectedOrder === 'Latest' ? 'CREATED_AT' : 'RATING_AVERAGE',
    orderDirection: selectedOrder === 'Lowest' ? 'ASC' : 'DESC',
    searchKeyword: debouncedSearch,
    first: 5
  });
  const navigate = useNavigate();

  const handleRepositoryPress = (item) => {
    navigate(`/${item.id}`);
  };

  const onEndReach = () => {
    fetchMore();
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Loading repositories...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error loading repositories: {error.message}</Text>
      </View>
    );
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      onRepositoryPress={handleRepositoryPress}
      onEndReach={onEndReach}
      order={selectedOrder}
      setOrder={setSelectedOrder}
      search={search}
      setSearch={setSearch}
    />
  );
};

export default RepositoryList;
