using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using ApiProjektas.Auth.Model;

namespace ApiProjektas.Data.Entities 
{
    public class Post
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Body { get; set; }

        [Required]
        public DateTimeOffset CreatedAt { get; set; }

        public bool IsLocked { get; set; }

        public Movie movie { get; set; }

        [Required]
        public required string UserId { get; set; }

        public ForumUser User { get; set; }

        public PostDto ToDto()
        {
            return new PostDto(this.movie?.Id ?? 0, Id, Title, Body, CreatedAt);
        }
    }
}
