import { SortablejsBinding } from './sortablejs-binding';
export class SortablejsBindings {
    bindings;
    constructor(bindingTargets) {
        this.bindings = bindingTargets.map(target => new SortablejsBinding(target));
    }
    injectIntoEvery(index, items) {
        this.bindings.forEach((b, i) => b.insert(index, items[i]));
    }
    getFromEvery(index) {
        return this.bindings.map(b => b.get(index));
    }
    extractFromEvery(index) {
        return this.bindings.map(b => b.remove(index));
    }
    get provided() {
        return !!this.bindings.length;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGFibGVqcy1iaW5kaW5ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1zb3J0YWJsZWpzL3NyYy9saWIvc29ydGFibGVqcy1iaW5kaW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUd6RCxNQUFNLE9BQU8sa0JBQWtCO0lBRTdCLFFBQVEsQ0FBc0I7SUFFOUIsWUFBWSxjQUE4QjtRQUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVELGVBQWUsQ0FBQyxLQUFhLEVBQUUsS0FBWTtRQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELFlBQVksQ0FBQyxLQUFhO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELGdCQUFnQixDQUFDLEtBQWE7UUFDNUIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7SUFDaEMsQ0FBQztDQUVGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU29ydGFibGVqc0JpbmRpbmcgfSBmcm9tICcuL3NvcnRhYmxlanMtYmluZGluZyc7XG5pbXBvcnQge1NvcnRhYmxlRGF0YX0gZnJvbSAnLi9zb3J0YWJsZWpzLmRpcmVjdGl2ZSc7XG5cbmV4cG9ydCBjbGFzcyBTb3J0YWJsZWpzQmluZGluZ3Mge1xuXG4gIGJpbmRpbmdzOiBTb3J0YWJsZWpzQmluZGluZ1tdO1xuXG4gIGNvbnN0cnVjdG9yKGJpbmRpbmdUYXJnZXRzOiBTb3J0YWJsZURhdGFbXSkge1xuICAgIHRoaXMuYmluZGluZ3MgPSBiaW5kaW5nVGFyZ2V0cy5tYXAodGFyZ2V0ID0+IG5ldyBTb3J0YWJsZWpzQmluZGluZyh0YXJnZXQpKTtcbiAgfVxuXG4gIGluamVjdEludG9FdmVyeShpbmRleDogbnVtYmVyLCBpdGVtczogYW55W10pIHtcbiAgICB0aGlzLmJpbmRpbmdzLmZvckVhY2goKGIsIGkpID0+IGIuaW5zZXJ0KGluZGV4LCBpdGVtc1tpXSkpO1xuICB9XG5cbiAgZ2V0RnJvbUV2ZXJ5KGluZGV4OiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy5iaW5kaW5ncy5tYXAoYiA9PiBiLmdldChpbmRleCkpO1xuICB9XG5cbiAgZXh0cmFjdEZyb21FdmVyeShpbmRleDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMuYmluZGluZ3MubWFwKGIgPT4gYi5yZW1vdmUoaW5kZXgpKTtcbiAgfVxuXG4gIGdldCBwcm92aWRlZCgpIHtcbiAgICByZXR1cm4gISF0aGlzLmJpbmRpbmdzLmxlbmd0aDtcbiAgfVxuXG59XG4iXX0=