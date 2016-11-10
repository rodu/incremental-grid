(function incrementalGrid(Rx){
  const DATA_LENGTH = 200;
  const PAGE_SIZE = 20;

  const makeRow = (data) => {
    const row = document.createElement('tr');

    Object.keys(data)
      .map((key) => data[key])
      .forEach((value) => {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.appendChild(cell);
      });

    return row;
  };
  const range = (size) => {
    return new Array(size)
      .join()
      .split(',')
      .map((x, i) => i);
  };
  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  const randomString = (max = 10, min = 5) => {
    return range(randomNumber(min, max))
      .map(() => String.fromCharCode(randomNumber(97, 122)))
      .join('');
  };
  const dataSet = range(DATA_LENGTH)
    .map((id) => {
      return {
        id: id + 1,
        name: randomString(),
        surname: randomString()
      };
    });

  const dataStream = Rx.Observable
    .range(0, PAGE_SIZE)
    .map((index) => {
      return dataSet[index];
    })
    .map((data) => {
      return [makeRow(data)];
    });

  const scrollStream = Rx.DOM
    .scroll(document.getElementById('grid-container'))
    .flatMap((event) => {
      const targetHeight = event.target.clientHeight;
      const targetScroll = event.target.scrollTop;

      if (targetHeight + targetScroll >= grid.clientHeight) {
        return Rx.Observable.return(event);
      }

      return Rx.Observable.return();
    })
    .filter((x) => x)
    .scan((page) => {
      return page += 1;
    }, 0)
    .flatMap((page) => {
      return Rx.Observable
        .range(page * PAGE_SIZE, PAGE_SIZE)
        .map((index) => {
          return dataSet[index];
        })
        .map((data) => {
          return [makeRow(data)];
        });
    });

  const appendRow = function(row){
    this.appendChild(row);
  };
  const grid = document.getElementById('grid');

  dataStream
    .merge(scrollStream)
    .take(dataSet.length)
    .subscribe((rowBuffer) => {
    rowBuffer.forEach(appendRow, grid);
  });

})(Rx);
