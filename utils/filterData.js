export const filterData = (data, locationType, locationName) => {
            return data.filter((destination) => {
                return destination[locationType].toLocaleLowerCase() === locationName.toLocaleLowerCase()
            })
}