import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.search;
    console.log(searchTerm);

    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query };

    // Filtering
    const excludeFields = ['search', 'sortBy', 'sortOrder'];

    excludeFields.forEach((el) => delete queryObj[el]);

    const filter = queryObj?.filter ? { author: queryObj?.filter } : {};
    console.log(filter);

    this.modelQuery = this.modelQuery.find(filter);

    return this;
  }

  sort() {
    const sortBy = this.query.sortBy || 'createdAt';
    const sortOrder = this.query?.sortOrder === 'asc' ? '' : '-';
    const sort = `${sortOrder}${sortBy}`;
    this.modelQuery = this.modelQuery.sort(sort);

    return this;
  }
}

export default QueryBuilder;
