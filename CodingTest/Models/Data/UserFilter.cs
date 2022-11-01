﻿namespace CodingTest.Models.Data
{
    public class UserFilter
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string SearchText { get; set; }
        public string SortBy { get; set; }
        public string SortDirection { get; set; }
    }
}
