const datas = [
  {
    name: "andi",
    gender: "male",
    dob: "20/12/2022",
    type: "single",
    employment: true,
  },
  {
    name: "bayu",
    gender: "male",
    dob: "20/12/2022",
    type: "single",
    employment: true,
  },
  {
    name: "siti",
    gender: "female",
    dob: "20/12/2022",
    type: "single",
    employment: true,
  },
  {
    name: "maria",
    gender: "female",
    dob: "27/12/2022",
    type: "married",
    employment: false,
  },
  {
    name: "joko",
    gender: "male",
    dob: "27/12/2033",
    type: "married",
    employment: false,
  },
];

const queryName = {
  WHERE: "where",
  AND: "and",
  OR: "or",
};

const queryType = {
  EQUAL: "eq",
  NOTEQ: "noteq",
};

const querys = [
  {
    name: queryName.WHERE,
    property: null,
    type: null,
    value: null,
  },
];

(querys[0].property = "employment"),
  (querys[0].type = queryType.EQUAL),
  (querys[0].value = false);

querys.push({
  name: queryName.AND,
  property: "type",
  type: queryType.NOTEQ,
  value: "single",
});
querys.push({
  name: queryName.AND,
  property: "gender",
  type: queryType.EQUAL,
  value: "female",
});
querys.push({
  name: queryName.AND,
  property: "dob",
  type: queryType.NOTEQ,
  value: "27/12/2025",
});

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insert(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  filterData(queries) {
    if (!queries || queries.length === 0) {
      return this.head;
    }

    let current = this.head;
    const filteredList = new LinkedList();

    while (current) {
      let passFilter = false;

      for (let i = 0; i < queries.length; i++) {
        const query = queries[i];
        if (query.name === queryName.WHERE) {
          if (current.data[query.property] === query.value) {
            passFilter = true;
          } else {
            passFilter = false;
            break;
          }
        } else if (query.name === queryName.AND) {
          if (query.type === queryType.EQUAL) {
            if (current.data[query.property] !== query.value) {
              passFilter = false;
              break;
            }
          } else if (query.type === queryType.NOTEQ) {
            if (current.data[query.property] === query.value) {
              passFilter = false;
              break;
            }
          }
        }
      }

      // Logic OR need improvement
      // if (!passFilter) {
      //   for (let i = 0; i < queries.length; i++) {
      //     const query = queries[i];
      //     if (query.name === queryName.OR) {
      //       if (current.data[query.property] === query.value) {
      //         passFilter = true;
      //         break;
      //       }
      //     }
      //   }
      // }

      if (passFilter) {
        filteredList.insert(current.data);
      }

      current = current.next;
    }

    return filteredList.head;
  }
}



const linkedList = new LinkedList();
datas.forEach((data) => linkedList.insert(data));

const filteredData = linkedList.filterData(querys);

let currentNode = filteredData;
const result = [];
while (currentNode) {
  result.push(currentNode.data);
  currentNode = currentNode.next;
}
console.log(result);

