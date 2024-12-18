using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using ApiProjektas.Auth.Model;

namespace ApiProjektas.Data.Entities 
{
    public class Movie
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTimeOffset CreatedAt { get; set; }

        public bool IsLocked { get; set; }

        [Required]
        public required string UserId { get; set; }

        public ForumUser User { get; set; }

    
        public MovieDto ToDto()
        {
            return new MovieDto(Id, Title, Description, CreatedAt);
        }
    }
}
