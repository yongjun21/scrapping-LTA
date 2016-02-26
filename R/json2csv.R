library(jsonlite)

dat <- fromJSON('travel.json')
dat <- dat[,-2]
write.csv(dat, '../data/data.csv', row.names=FALSE)

dat <- fromJSON('taxi.json')
write.csv(dat, '../data/data.csv', row.names=FALSE)

summ <- aggregate(lat ~ timestamp, dat, length)
summ$time <- as.POSIXlt(count$timestamp / 1000, origin='1970-01-01')
summ$hour <- summ$time$hour
summ$min <- summ$time$min
summ$lat <- summ$count
