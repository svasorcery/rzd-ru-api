﻿using System;
using System.Collections.Generic;

namespace HermesSpa.Services
{
    public partial class RailKaolinApiClient
    {
        public class TrainsListResult
        {
            public string SessionId { get; set; }
            public string Origin { get; set; }
            public string OriginCode { get; set; }
            public string Destination { get; set; }
            public string DestinationCode { get; set; }
            public DateTime DepartureDate { get; set; }
            public TimeType TimeType { get; set; }
            public bool? NoFreeTickets { get; set; }
            public IEnumerable<Train> Trains { get; set; }


            public class Train
            {
                public int OptionRef { get; set; }
                public string Name { get; set; }
                public string Number { get; set; }
                public string DisplayNumber { get; set; }
                public TripEvent RouteStart { get; set; }
                public string RouteEndStation { get; set; }
                public TripEvent Depart { get; set; }
                public TripEvent Arrive { get; set; }
                public TripEvent ArriveLocal { get; set; }
                public TimeSpan TripDuration { get; set; }
                public string TimezoneDifference { get; set; }
                public string Carrier { get; set; }
                public string Brand { get; set; }
                public bool BEntire { get; set; }
                public bool IsFirm { get; set; }
                public bool IsComponent { get; set; }
                public bool HasElectronicRegistration { get; set; }
                public bool HasDynamicPricing { get; set; }
                public int? TripDistance { get; set; }
                public IEnumerable<Car> Cars { get; set; }
            }

            public class Car
            {
                public string Type { get; set; }
                public string ServiceClass { get; set; }
                public int FreeSeats { get; set; }
                public decimal MinPrice { get; set; }
                public int? BonusPoints { get; set; }
            }
        }
    }
}
