using System;
using System.Linq;
using ApiProjektas.Data;
using ApiProjektas.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using SharpGrip.FluentValidation.AutoValidation.Endpoints.Extensions;
using ApiProjektas.Auth.Model;
using ApiProjektas;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;



public static class Endpoints
{

    public static void AddTestApi(this WebApplication app)
{
    app.MapGet("/api/test", async (ProjectDb dbContext) =>
    {
        try
        {
            var movies = await dbContext.Movies.ToListAsync();
            return Results.Ok(movies);
        }
        catch (Exception ex)
        {
            return Results.Problem("Database connection failed: " + ex.Message);
        }
    });
}
    public static void AddMoviesApi(this WebApplication app)
    {
        var moviesGroups = app.MapGroup("/api").AddFluentValidationAutoValidation();

        moviesGroups.MapGet("/movies", async (ProjectDb dbContext) =>
        {
            var movies = await dbContext.Movies.ToListAsync();
            return movies.Select(movie => movie.ToDto());
        });

        moviesGroups.MapPost("/movies", [Authorize(Roles = ForumRoles.ForumUser)] async (CreateOrUpdateMovieDto dto, ProjectDb dbContext,LinkGenerator linkGenerator, HttpContext httpContext) =>
       {
           var movie = new Movie { Title = dto.Title, Description = dto.Description, CreatedAt = DateTimeOffset.UtcNow,
              UserId = httpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sub)};
           dbContext.Movies.Add(movie);
           await dbContext.SaveChangesAsync();

           return Results.Created($"api/movies/{movie.Id}", movie.ToDto());
       });

        moviesGroups.MapGet("/movies/{movieId}", async (int movieId, ProjectDb dbContext) =>
        {
            var movie = await dbContext.Movies.FindAsync(movieId);
            if (movie == null)
            {
                return Results.NotFound();
            }

            return Results.Ok(movie.ToDto());
        });

        moviesGroups.MapPut("/movies/{movieId}", [Authorize] async (CreateOrUpdateMovieDto dto, int movieId, HttpContext httpContext, ProjectDb dbContext) =>
        {
            var movie = await dbContext.Movies.FindAsync(movieId);
            if (movie == null)
            {
                return Results.NotFound();
            }

            if (!httpContext.User.IsInRole(ForumRoles.Admin) &&
            httpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sub) != movie.UserId)
            {
            // NotFound()
            return Results.Forbid();
            }

            movie.Title = dto.Title;
            movie.Description = dto.Description;
            dbContext.Movies.Update(movie);
            await dbContext.SaveChangesAsync();

            return Results.Ok(movie.ToDto());
        });

        moviesGroups.MapDelete("/movies/{movieId}", async (int movieId, ProjectDb dbContext) =>
        {
            var movie = await dbContext.Movies.FindAsync(movieId);
            if (movie == null)
            {
                return Results.NotFound();
            }

            dbContext.Movies.Remove(movie);
            await dbContext.SaveChangesAsync();

            return Results.NoContent();
        });
    }

    public static void AddPostsApi(this WebApplication app)
    {
        var postsGroups = app.MapGroup("/api/movies/{movieId}").AddFluentValidationAutoValidation();

        postsGroups.MapGet("/posts", async (int movieId, ProjectDb dbContext) =>
        {
            var movie = await dbContext.Movies.FindAsync(movieId);
            if (movie == null)
            {
                return Results.NotFound();
            }

            var posts = await dbContext.Posts.Where(post => post.movie.Id == movieId).ToListAsync();
            return Results.Ok(posts.Select(post => post.ToDto()));
        });

        

       postsGroups.MapPost("/posts", async (int movieId, CreateOrUpdatePostDto dto, ProjectDb dbContext) =>
       {
           var movie = await dbContext.Movies.FindAsync(movieId);
           if (movie == null)
           {
               return Results.NotFound();
           }

           var post = new Post { Title = dto.Title, Body = dto.Body, CreatedAt = DateTimeOffset.UtcNow, movie = movie, UserId = " " };
           dbContext.Posts.Add(post);
           await dbContext.SaveChangesAsync();

           return Results.Created($"/api/movies/{movieId}/posts/{post.Id}", post.ToDto());
       });

        postsGroups.MapGet("/posts/{postId}", async (int movieId, int postId, ProjectDb dbContext) =>
        {
            var posts = dbContext.Posts.Include(post => post.movie);
            var post = await posts.FirstOrDefaultAsync(post => post.Id == postId && post.movie.Id == movieId);
            if (post == null)
            {
                return Results.NotFound();
            }

            return Results.Ok(post.ToDto());
        });

        postsGroups.MapPut("/posts/{postId}", async (int movieId, int postId, CreateOrUpdatePostDto dto, ProjectDb dbContext) =>
        {
            var posts = dbContext.Posts.Include(post => post.movie);
            var post = await posts.FirstOrDefaultAsync(post => post.Id == postId && post.movie.Id == movieId);
            if (post == null)
            {
                return Results.NotFound();
            }

            post.Title = dto.Title;
            post.Body = dto.Body;
            dbContext.Posts.Update(post);
            await dbContext.SaveChangesAsync();

            return Results.Ok(post.ToDto());
        });

        postsGroups.MapDelete("/posts/{postId}", async (int movieId, int postId, ProjectDb dbContext) =>
        {
            var posts = dbContext.Posts.Include(post => post.movie);
            var post = await posts.FirstOrDefaultAsync(post => post.Id == postId && post.movie.Id == movieId);
            if (post == null)
            {
                return Results.NotFound();
            }

            dbContext.Posts.Remove(post);
            await dbContext.SaveChangesAsync();

            return Results.NoContent();
        });
    }

    public static void AddCommentsApi(this WebApplication app)
    {
        var commentsGroups = app.MapGroup("/api/movies/{movieId}/posts/{postId}").AddFluentValidationAutoValidation();

        commentsGroups.MapGet("/comments", async (int movieId, int postId, ProjectDb dbContext) =>
        {
            var posts = dbContext.Posts.Include(post => post.movie);
            var post = await posts.FirstOrDefaultAsync(post => post.Id == postId && post.movie.Id == movieId);

            if (post == null || post.movie.Id != movieId)
            {
                return Results.NotFound();
            }

            var comments = await dbContext.Comments.Where(comment => comment.Post.Id == postId).ToListAsync();
            return Results.Ok(comments.Select(comment => comment.ToDto()));
        });

        commentsGroups.MapPost("/comments", async (int movieId, int postId, CreateOrUpdateCommentDto dto, ProjectDb dbContext) =>
        {
           var posts = dbContext.Posts.Include(post => post.movie);
           var post = await posts.FirstOrDefaultAsync(post => post.Id == postId && post.movie.Id == movieId);

           if (post == null || post.movie.Id != movieId)
           {
               return Results.NotFound();
           }

           var comment = new Comment
           {
               Content = dto.Content,
               CreatedAt = DateTimeOffset.UtcNow,
               UserId = " ",
               Post = post
               
           };

           dbContext.Comments.Add(comment);
           await dbContext.SaveChangesAsync();

           return Results.Created($"/api/movies/{movieId}/posts/{postId}/comments/{comment.Id}", comment.ToDto());
        });

        commentsGroups.MapGet("/comments/{commentId}", async (int movieId, int postId, int commentId, ProjectDb dbContext) =>
        {
            var comment = await dbContext.Comments
                .Include(comment => comment.Post)
                .FirstOrDefaultAsync(comment => comment.Id == commentId && comment.Post.Id == postId && comment.Post.movie.Id == movieId);

            if (comment == null)
            {
                return Results.NotFound();
            }

            return Results.Ok(comment.ToDto());
        });

        commentsGroups.MapPut("/comments/{commentId}", async (int movieId, int postId, int commentId, CreateOrUpdateCommentDto dto, ProjectDb dbContext) =>
        {
            var comment = await dbContext.Comments
                .Include(comment => comment.Post)
                .FirstOrDefaultAsync(comment => comment.Id == commentId && comment.Post.Id == postId && comment.Post.movie.Id == movieId);

            if (comment == null)
            {
                return Results.NotFound();
            }

            comment.Content = dto.Content;
            dbContext.Comments.Update(comment);
            await dbContext.SaveChangesAsync();

            return Results.Ok(comment.ToDto());
        });

        commentsGroups.MapDelete("/comments/{commentId}", async (int movieId, int postId, int commentId, ProjectDb dbContext) =>
        {
            var comment = await dbContext.Comments
                .Include(comment => comment.Post)
                .FirstOrDefaultAsync(comment => comment.Id == commentId && comment.Post.Id == postId && comment.Post.movie.Id == movieId);

            if (comment == null)
            {
                return Results.NotFound();
            }

            dbContext.Comments.Remove(comment);
            await dbContext.SaveChangesAsync();

            return Results.NoContent();
        });
    }
}
